import { ManpowerAllocationData } from './pdfGenerator'

export interface ManpowerSubmission {
  id: string
  date: string
  submissionDate: string
  data: ManpowerAllocationData
  pdfUrl: string
}

const STORAGE_KEY = 'manpower_submissions'

export const saveSubmission = (submission: ManpowerSubmission): void => {
  try {
    const existingSubmissions = getSubmissions()
    const updatedSubmissions = [...existingSubmissions, submission]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubmissions))
  } catch (error) {
    console.error('Error saving submission:', error)
  }
}

export const getSubmissions = (): ManpowerSubmission[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error retrieving submissions:', error)
    return []
  }
}

export const getSubmissionsByDate = (date: string): ManpowerSubmission[] => {
  const submissions = getSubmissions()
  return submissions.filter(submission => submission.date === date)
}

export const getSubmissionById = (id: string): ManpowerSubmission | null => {
  const submissions = getSubmissions()
  return submissions.find(submission => submission.id === id) || null
}

export const generateSubmissionId = (): string => {
  return `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
} 