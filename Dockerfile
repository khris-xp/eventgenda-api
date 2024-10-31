# Build stage
FROM node:18-alpine AS builder

# Install git for husky (if needed)
RUN apk add --no-cache git

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies without husky preparation
RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev && \
    npm cache clean --force

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app ./

# Set environment variables
ENV NODE_ENV=production \
    PORT=8081

# Expose port
EXPOSE 8081

# Start application
CMD ["npm", "start"]