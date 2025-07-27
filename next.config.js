/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh6.googleusercontent.com',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'pmo-application-development',
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add support for PDF.js worker
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }

    // Configure PDF.js worker and Firebase compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        dns: false,
        child_process: false,
        'puppeteer': false,
        'puppeteer-core': false,
      }
    }

    // Exclude Puppeteer and related packages from client bundle
    config.externals = config.externals || []
    if (!isServer) {
      config.externals.push('puppeteer', 'puppeteer-core')
    }

    // Fix for Firebase/undici compatibility issue
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
    }

    // Handle PDF files
    config.module.rules.push({
      test: /\.pdf$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files/',
          outputPath: 'static/files/',
        },
      },
    })

    // Copy PDF.js worker file
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.PDF_WORKER_SRC': JSON.stringify('/pdf.worker.min.js'),
      })
    )

    return config
  },
  // Add headers for PDF files and CORS
  async headers() {
    return [
      {
        source: '/documents/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/pdf.worker.min.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 