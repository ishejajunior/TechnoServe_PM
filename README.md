# TechnoServe Project Management Tool

A comprehensive project management web application for TechnoServe, built to facilitate collaboration and tracking for nonprofit projects.

## Tech Stack

### Frontend

- React 18+ with TypeScript
- Tailwind CSS for styling
- React Router v6 for navigation
- Socket.io for real-time updates
- Firebase Authentication

### Backend

- Node.js with Express.js and TypeScript
- PostgreSQL with Prisma ORM
- Firebase Admin SDK for authentication
- Socket.io for real-time features

## Features

- **Project Management**: Create, track, and manage projects with status updates
- **Task Management**: Kanban board and task dependencies
- **Team Collaboration**: Role-based access control and commenting
- **Google Workspace Integration**: Calendar, Drive, and Gmail integration
- **Visualizations**: Gantt charts and project timelines
- **Real-time Updates**: Live notifications and collaborative editing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Firebase account with Authentication enabled

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/technoserve-pm.git
cd technoserve-pm
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables

   - Create a `.env` file in the `backend` folder (see `.env.example`)
   - Create a `.env` file in the `frontend` folder (see `.env.example`)

4. Set up the database

```bash
# In the backend folder
npx prisma migrate dev
npx prisma db seed
```

5. Start the development servers

```bash
# Start backend server (from backend folder)
npm run dev

# Start frontend server (from frontend folder)
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

### Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/       # Static assets
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Route components
│   ├── services/     # API service functions
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main App component
│   └── index.tsx     # Application entry point
```

### Backend

```
backend/
├── prisma/           # Prisma schema and migrations
├── src/
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Express middleware
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── index.ts      # Server entry point
```

## Available Scripts

### Backend

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build for production
- `npm start`: Start the production server
- `npm test`: Run tests

### Frontend

- `npm start`: Start the development server
- `npm run build`: Build for production
- `npm test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TechnoServe for their impactful work in the nonprofit sector
- All contributors who participate in this project
