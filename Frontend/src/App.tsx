import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import KanbanBoard from './pages/KanbanBoard';
import GanttChart from './pages/GanttChart';
import Login from './pages/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="projects/:projectId/kanban" element={<KanbanBoard />} />
            <Route path="projects/:projectId/gantt" element={<GanttChart />} />
          </Route>
        </Route>

        {/* Role-specific routes */}
        <Route 
          element={
            <ProtectedRoute 
              allowedRoles={['SUPER_ADMIN', 'TEAM_LEAD']} 
            />
          }
        >
          <Route element={<Layout />}>
            {/* Admin-only routes would go here */}
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App; 