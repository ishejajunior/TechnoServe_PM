import express from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Project schema for validation
const projectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled']),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// Mock projects data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'Community Garden Initiative',
    description: 'Enhancing community well-being through collaborative gardening efforts.',
    status: 'Active',
    priority: 'High',
    startDate: '2023-10-01T00:00:00Z',
    endDate: '2023-12-31T00:00:00Z',
    createdBy: 'user1',
    progress: 65,
  },
  {
    id: '2',
    name: 'Youth Entrepreneurship Program',
    description: 'Empowering young entrepreneurs with skills and resources.',
    status: 'Planning',
    priority: 'Medium',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-06-30T00:00:00Z',
    createdBy: 'user1',
    progress: 20,
  },
  {
    id: '3',
    name: 'Clean Water Access Project',
    description: 'Providing clean water solutions to underserved communities.',
    status: 'On Hold',
    priority: 'High',
    startDate: '2023-08-01T00:00:00Z',
    endDate: '2023-12-31T00:00:00Z',
    createdBy: 'user2',
    progress: 40,
  },
];

// Get all projects
router.get('/', authMiddleware, (req, res) => {
  try {
    // In a real app, you would fetch projects from the database
    // And filter by user permissions
    res.json(mockProjects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific project
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const project = mockProjects.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new project
router.post('/', authMiddleware, (req, res) => {
  try {
    // Validate request body
    const validatedData = projectSchema.parse(req.body);
    
    // In a real app, you would save to database
    const newProject = {
      id: Date.now().toString(),
      ...validatedData,
      createdBy: (req as any).user.id,
      progress: 0,
    };
    
    // Mock adding to the array
    mockProjects.push(newProject);
    
    res.status(201).json(newProject);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update a project
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = mockProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Validate request body
    const validatedData = projectSchema.parse(req.body);
    
    // Update project
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...validatedData,
    };
    
    res.json(mockProjects[projectIndex]);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a project
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = mockProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Remove project
    const deletedProject = mockProjects.splice(projectIndex, 1)[0];
    
    res.json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 