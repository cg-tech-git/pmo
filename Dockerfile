# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS deps
# Add libc6-compat for Alpine compatibility
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
# Install Python and gsutil dependencies
RUN apk add --no-cache python3 py3-pip curl bash
# Install gsutil
RUN pip3 install gsutil
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
# Install Python and gsutil for runtime
RUN apk add --no-cache python3 py3-pip curl bash
RUN pip3 install gsutil
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Set the PORT environment variable for Cloud Run
ENV PORT 8080

# Start the application
CMD ["node", "server.js"] 