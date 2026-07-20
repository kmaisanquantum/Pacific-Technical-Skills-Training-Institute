# Pacific Technical Skills Training Institute (PTSTI) — Monolithic Full-Stack App

This repository contains the monolithic refactored full-stack application for the Motor Vehicle Mechanic Trade Course at the **Pacific Technical Skills Training Institute (PTSTI)**, Papua New Guinea.

## 🚀 Target Architecture
The application is deployed as a single monolithic service that combines:
1. **Frontend:** A high-performance single page application built with Vite, React 18, and modern modular CSS.
2. **Backend:** A Node.js and Express API backend serving static assets and hosting secure `/api/` endpoints (including the `/api/chat` secure proxy to Anthropic API).
3. **Database:** Postgres database integration for persistence of users, course module progress, and payment records.

---

## 🛠️ Local Development Setup

To run the application locally for development:

### 1. Backend Server Setup
Navigate to the `server` directory, install dependencies, and start the server:
```bash
cd server
npm install
npm start
```
By default, the server runs on port `5000` and initializes database tables. If no PostgreSQL connection is provided via `DATABASE_URL`, it gracefully falls back to robust local in-memory operation.

### 2. Frontend Client Setup
Navigate to the `client` directory, install dependencies, and start the Vite development server:
```bash
cd client
npm install
npm run dev
```
The Vite development server runs on port `3000` and is pre-configured to proxy `/api/*` requests to the Express server running on port `5000`.

---

## 🐳 Coolify Deployment Guide (Dockerfile Build Pack)

To deploy this application to Coolify or other container-based platforms, you **must configure it to use a Dockerfile build pack**. Do not use default Nixpacks, as Vite multi-stage production builds are highly optimized inside the provided Dockerfile.

### Required Steps:
1. In your Coolify Application settings, change the **Build Pack** from `Nixpacks` (the default) to **Dockerfile**.
2. Keep the **Dockerfile Path** set to `./Dockerfile` (or `Dockerfile` relative to the repository root).
3. Set the following environment variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your PostgreSQL database URL (Coolify can auto-provision a Postgres database and inject this).
   - `ANTHROPIC_API_KEY`: Your server-side Anthropic API key (used securely by the `/api/chat` proxy).
4. Save and click **Deploy**.
