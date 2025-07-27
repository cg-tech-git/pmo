import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Initialize OAuth2 client with Firebase Auth token
export async function getAuthenticatedClient(accessToken: string): Promise<OAuth2Client> {
  console.log('Creating OAuth2 client with token');
  
  // Get client ID from Firebase config or environment
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  console.log('OAuth2 Config - Client ID:', clientId ? 'Found' : 'Not found');
  console.log('OAuth2 Config - Client Secret:', clientSecret ? 'Found' : 'Not found');
  
  const oauth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    'http://localhost:3000'
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return oauth2Client;
}

// Create a new Google Sheet
export async function createGoogleSheet(
  accessToken: string,
  title: string,
  headers: string[],
  rows: any[][]
) {
  console.log('createGoogleSheet called with:', { title, headerCount: headers.length, rowCount: rows.length });
  
  const authClient = await getAuthenticatedClient(accessToken);
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const drive = google.drive({ version: 'v3', auth: authClient });

  try {
    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
        sheets: [{
          properties: {
            title: 'Accreditation Report',
          },
        }],
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId!;

    // Prepare data for batch update
    const values = [headers, ...rows];

    // Update the sheet with data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Accreditation Report!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    // Format header row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.18, green: 0.47, blue: 0.81 },
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: 0,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: headers.length,
              },
            },
          },
        ],
      },
    });

    // Get the spreadsheet URL
    const fileResponse = await drive.files.get({
      fileId: spreadsheetId,
      fields: 'webViewLink',
    });

    return {
      spreadsheetId,
      url: fileResponse.data.webViewLink || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    };
  } catch (error) {
    console.error('Error creating Google Sheet:', error);
    throw error;
  }
}

// Get user's Google access token from Firebase
export async function getUserAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null; // Server-side
  }

  const { auth } = await import('@/lib/firebase');
  const user = auth?.currentUser;
  
  if (!user) {
    return null;
  }

  // Get the OAuth credential from the user
  // This requires the user to have signed in with Google
  try {
    // Force token refresh to ensure we have the latest token
    await user.getIdToken(true);
    
    // Get the access token from the user's auth provider data
    // The access token is stored when the user signs in with Google
    const providerData = user.providerData.find(
      (provider: any) => provider?.providerId === 'google.com'
    );
    
    if (!providerData) {
      console.error('User did not sign in with Google');
      return null;
    }
    
    // For Firebase v9, we need to store the access token during sign-in
    // and retrieve it from a custom claim or session storage
    // Let's check if it's stored in session storage (we'll add this during sign-in)
    const accessToken = sessionStorage.getItem('google_access_token');
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
} 