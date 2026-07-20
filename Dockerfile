# ==========================================
# STAGE 1: Build the Vite production frontend
# ==========================================
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy client dependencies definitions
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy client source code
COPY client/ ./

# Build production assets (Vite will output to /app/client/dist)
RUN npm run build

# ==========================================
# STAGE 2: Build the final production monolith
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy server package definitions
COPY server/package*.json ./server/

# Install server production dependencies
RUN npm ci --prefix server --only=production

# Copy server source code
COPY server/ ./server/

# Copy compiled frontend assets from STAGE 1
COPY --from=client-builder /app/client/dist ./client/dist

EXPOSE 5000

# Start the monolithic Node.js + Express server
CMD ["node", "server/server.js"]
