import express from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// User schema for validation
const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['TEAM_LEAD', 'TEAM_MEMBER', 'EXTERNAL_PARTNER']).optional(),
  department: z.string().optional(),
  timezone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Mock users data (would be stored in Firebase Auth in a real application)
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
  }
];

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Validate request body
    const validatedData = signupSchema.parse(req.body);
    
    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Create a new user in Firebase Auth
    // 3. Create a user record in your database
    
    // Mock user creation
    const newUser = {
      id: `u${Date.now()}`,
      firebaseUid: `firebase${Date.now()}`,
      ...validatedData,
      role: validatedData.role || 'TEAM_MEMBER',
      createdAt: new Date().toISOString(),
    };
    
    // Mock adding to the array
    mockUsers.push(newUser);
    
    // Generate a mock token (in reality, you'd use Firebase Auth to generate a token)
    const token = `mock_token_${newUser.id}`;
    
    // Remove sensitive information
    const { firebaseUid, ...safeUser } = newUser;
    
    res.status(201).json({
      user: safeUser,
      token,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    
    // In a real app, you would:
    // 1. Authenticate the user with Firebase Auth
    // 2. Generate a token
    // 3. Return the user data and token
    
    // Mock authentication
    const user = mockUsers.find(u => u.email === validatedData.email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate a mock token
    const token = `mock_token_${user.id}`;
    
    // Remove sensitive information
    const { firebaseUid, ...safeUser } = user;
    
    res.json({
      user: safeUser,
      token,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authMiddleware, (req, res) => {
  try {
    // In a real app, this would be set by the auth middleware
    const userId = (req as any).user.id;
    
    const user = mockUsers.find(u => u.id === userId);
    
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

// Google SSO login/signup
router.post('/google', async (req, res) => {
  try {
    // In a real app, you would:
    // 1. Verify the Google ID token
    // 2. Create or fetch the user from your database
    // 3. Generate a Firebase custom token or session
    
    // Mock data
    const mockGoogleUser = {
      id: 'google_user_1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: 'https://example.com/profile.jpg',
    };
    
    // Find or create user
    let user = mockUsers.find(u => u.email === mockGoogleUser.email);
    
    if (!user) {
      // Create new user
      user = {
        id: `u${Date.now()}`,
        firebaseUid: `firebase${Date.now()}`,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        role: 'TEAM_MEMBER',
        timezone: 'UTC',
        createdAt: new Date().toISOString(),
      };
      
      mockUsers.push(user);
    }
    
    // Generate a mock token
    const token = `mock_token_${user.id}`;
    
    // Remove sensitive information
    const { firebaseUid, ...safeUser } = user;
    
    res.json({
      user: safeUser,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  // In a real app, you might invalidate the token or clear the session
  res.json({ message: 'Logged out successfully' });
});

export default router; 