# Fakarny API

## About the Project

Fakarny is a personal document management system designed to help users organize and keep track of their important documents, bills, and deadlines in one place.

People often have important documents such as national IDs, driving licenses, passports, insurance papers, and product warranties. These documents may have expiration dates that are easy to forget, and losing track of them can cause inconvenience or unexpected problems. Similarly, keeping track of bills and payment deadlines manually can make it difficult to stay organized.

Fakarny aims to solve these problems by providing a centralized system where users can manage their important documents and bills, store document details, upload related files, and monitor upcoming expiration dates and payment deadlines.

Users can create reminders for their documents by specifying how many days before the expiration date they want to be notified. The system automatically checks for due reminders and generates in-app notifications, helping users remember important dates before their documents expire.

The application also allows users to manage their bills by recording their amounts, due dates, and payment statuses, making it easier to keep track of unpaid bills and upcoming payments.

Fakarny is built as a RESTful backend API with user authentication and authorization, ensuring that each user can manage and access their own information securely. It is designed to provide an organized and reliable foundation for a personal document and deadline management application.

## Features

- User registration and login
- JWT authentication
- Profile management and password changes
- Create, view, update, and delete documents
- Upload document files
- Create and manage bills
- Schedule reminders before document expiration
- Store in-app notifications
- Validate request data using Zod
- PostgreSQL database integration using TypeORM

## Technologies

- Node.js
- Express.js
- PostgreSQL
- TypeORM
- JWT
- bcrypt
- Zod
- Multer
- node-cron
- Jest
- Supertest

## Requirements

- Node.js
- PostgreSQL
- npm

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=fakarny_db
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own database credentials and JWT secret.

### 3. Create the Database

Create a PostgreSQL database named `fakarny_db`.

### 4. Run the Development Server

```bash
npm run dev
```

## Main Endpoints

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | View profile |
| PATCH | `/api/users/me` | Update profile |
| PATCH | `/api/users/change-password` | Change password |
| DELETE | `/api/users/me` | Delete account |

### Documents

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/documents` | List personal documents |
| POST | `/api/documents` | Create a document |
| PATCH | `/api/documents/:id` | Update a document |
| DELETE | `/api/documents/:id` | Delete a document |
| POST | `/api/documents/:id/file` | Upload a document file |

### Bills

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bills` | List bills |
| POST | `/api/bills` | Create a bill |
| PATCH | `/api/bills/:id` | Update a bill |
| DELETE | `/api/bills/:id` | Delete a bill |

### Reminders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reminders` | List reminders |
| POST | `/api/reminders` | Create a reminder |
| DELETE | `/api/reminders/:id` | Delete a reminder |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | List notifications |
| PATCH | `/api/notifications/:id/read` | Mark a notification as read |

## Authentication

Protected routes require a valid JWT access token.

Include the token in the request headers:

```http
Authorization: Bearer <your_access_token>
```

## Testing

Run the automated tests:

```bash
npm test
```

The project uses Jest and Supertest for testing.

## Important Notes

- Configure environment variables before starting the server.
- Ensure PostgreSQL is running and the database exists.
- Local file storage is intended for development.
- Use secure, persistent file storage for production deployment.
- Never commit your `.env` file or expose sensitive credentials.
- Review database migrations and security settings before production deployment.