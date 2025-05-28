import express from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// User schema for validation
const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(['SUPER_ADMIN', 'TEAM_LEAD', 'TEAM_MEMBER', 'EXTERNAL_PARTNER']),
  department: z.string().optional(),
  timezone: z.string().optional(),
});

// Mock users data for demonstration
const mockUsers = [
  {
    id: 'u1',
    firebaseUid: 'firebase1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'TEAM_LEAD',
    department: 'Digital',
    timezone: 'America/New_York',
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: 'u2',
    firebaseUid: 'firebase2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@example.com',
    role: 'TEAM_MEMBER',
    department: 'Digital',
    timezone: 'America/Chicago',
    createdAt: '2023-02-10T10:30:00Z',
  },
  {
    id: 'u3',
    firebaseUid: 'firebase3',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    role: 'TEAM_MEMBER',
    department: 'Communications',
    timezone: 'America/Los_Angeles',
    createdAt: '2023-03-05T09:15:00Z',
  },
  {
    id: 'u4',
    firebaseUid: 'firebase4',
    name: 'David Okafor',
    email: 'david.okafor@example.com',
    role: 'EXTERNAL_PARTNER',
    timezone: 'Africa/Lagos',
    createdAt: '2023-04-20T11:45:00Z',
  },
];

// Get all users
router.get('/', authMiddleware, (req, res) => {
  try {
    // In a real app, you would:
    // 1. Check if the user has permission to view all users
    // 2. Fetch from the database with pagination
    // 3. Filter out sensitive information
    
    const users = mockUsers.map(({ firebaseUid, ...user }) => user);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove sensitive information
    const { firebaseUid, ...safeUser } = user;
    
    res.json(safeUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // In a real app, you would check if the current user has permission to update this user
    
    // Validate request body
    const validatedData = userSchema.parse(req.body);
    
    // Update user
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...validatedData,
    };
    
    // Remove sensitive information
    const { firebaseUid, ...safeUser } = mockUsers[userIndex];
    
    res.json(safeUser);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get users by project
router.get('/project/:projectId', authMiddleware, (req, res) => {
  try {
    const { projectId } = req.params;
    
    // In a real app, you would:
    // 1. Check if the user has permission to view the project
    // 2. Fetch users assigned to this project from the database
    
    // For this mock example, we'll just return all users
    const users = mockUsers.map(({ firebaseUid, ...user }) => user);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 