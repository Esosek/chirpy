# Chirpy

A Twitter-like social media application built with Node.js, TypeScript, and PostgreSQL. Project based upon [Boot.dev](https://www.boot.dev/).

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Chirps**: Create, read, update, and delete short messages (max 140 characters)
- **User Management**: Update user profiles and manage accounts
- **RESTful API**: Clean REST endpoints for all operations

## Prerequisites

- Node.js 21.7.0 (check `.nvmrc`)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Esosek/chirpy
cd chirpy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env` file:
```env
DB_URL=postgresql://username:password@localhost:5432/chirpy?sslmode=disabled
API_SECRET=your-jwt-secret-key
POLKA_KEY=your-polka-webhook-key
PLATFORM=dev
```

4. Generate and run database migrations:
```bash
npm run generate
npm run migrate
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:8080`

## API Documentation

For detailed API documentation, see [docs/api](docs/api).

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Build and run in development mode
- `npm run generate` - Generate database migration files
- `npm run migrate` - Run database migrations
- `npm test` - Run tests

## API Endpoints

### Public Endpoints
- `GET /api/healthz` - Health check
- `POST /api/users` - Create user account
- `POST /api/login` - User login
- `GET /api/chirps` - Get all chirps
- `GET /api/chirps/:id` - Get specific chirp

### Protected Endpoints
- `PUT /api/users` - Update user profile
- `POST /api/chirps` - Create new chirp
- `DELETE /api/chirps/:id` - Delete chirp
- `POST /api/refresh` - Refresh JWT token
- `POST /api/revoke` - Revoke refresh token

### Admin Endpoints
- `GET /admin/metrics` - System metrics
- `POST /admin/reset` - Reset database

### Webhook Endpoints
- `POST /api/polka/webhooks` - Handle Polka payment webhooks

## Database Schema

The application uses three main tables:
- `users` - User accounts and profiles
- `chirps` - User posts/messages
- `refresh_tokens` - JWT refresh token management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URL` | PostgreSQL connection string | Yes |
| `API_SECRET` | JWT signing secret | Yes |
| `POLKA_KEY` | Webhook authentication key | Yes |
| `PLATFORM` | Environment (dev/prod) | No (defaults to prod) |
