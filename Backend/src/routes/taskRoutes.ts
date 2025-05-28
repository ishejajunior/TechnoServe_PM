import express from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Task schema for validation
const taskSchema = z.object({
  projectId: z.string(),
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['To Do', 'In Progress', 'Review', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High']),
  assigneeId: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  dependencies: z.array(z.string()).optional(),
});

// Mock tasks data for demonstration
const mockTasks = [
  {
    id: 't1',
    projectId: '1',
    title: 'Prepare Garden Beds',
    description: 'Clear weeds, till soil, and add compost to the designated garden areas.',
    status: 'To Do',
    priority: 'High',
    assigneeId: 'u2',
    dueDate: '2023-11-15T00:00:00Z',
    createdBy: 'u1',
    createdAt: '2023-10-15T10:30:00Z',
  },
  {
    id: 't2',
    projectId: '1',
    title: 'Source Seedlings',
    description: 'Identify and procure a variety of vegetable and flower seedlings from local nurseries.',
    status: 'To Do',
    priority: 'Medium',
    assigneeId: 'u1',
    dueDate: '2023-11-20T00:00:00Z',
    createdBy: 'u1',
    createdAt: '2023-10-16T09:15:00Z',
  },
  {
    id: 't3',
    projectId: '1',
    title: 'Install Irrigation System',
    description: 'Set up a drip irrigation system to ensure efficient watering of the garden beds.',
    status: 'In Progress',
    priority: 'High',
    assigneeId: 'u2',
    dueDate: '2023-12-01T00:00:00Z',
    createdBy: 'u1',
    createdAt: '2023-10-18T14:45:00Z',
    dependencies: ['t1'],
  },
  {
    id: 't4',
    projectId: '1',
    title: 'Design Garden Layout',
    description: 'Create a detailed layout plan for the garden, including placement of plants and pathways.',
    status: 'Done',
    priority: 'High',
    assigneeId: 'u2',
    dueDate: '2023-10-30T00:00:00Z',
    createdBy: 'u1',
    createdAt: '2023-10-01T08:00:00Z',
  },
  {
    id: 't5',
    projectId: '1',
    title: 'Recruit Volunteers',
    description: 'Organize and conduct volunteer recruitment efforts to gather support for the project.',
    status: 'Done',
    priority: 'Medium',
    assigneeId: 'u3',
    dueDate: '2023-11-10T00:00:00Z',
    createdBy: 'u1',
    createdAt: '2023-10-05T11:20:00Z',
  },
];

// Get all tasks
router.get('/', authMiddleware, (req, res) => {
  try {
    const { projectId } = req.query;
    
    let tasks = mockTasks;
    
    // Filter by project if projectId is provided
    if (projectId) {
      tasks = tasks.filter(task => task.projectId === projectId);
    }
    
    // In a real app, you would also filter by user permissions
    
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific task
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const task = mockTasks.find(t => t.id === id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
router.post('/', authMiddleware, (req, res) => {
  try {
    // Validate request body
    const validatedData = taskSchema.parse(req.body);
    
    // Check for circular dependencies
    if (validatedData.dependencies && validatedData.dependencies.length > 0) {
      // In a real app, you would implement a cycle detection algorithm here
    }
    
    // In a real app, you would save to database
    const newTask = {
      id: `t${Date.now()}`,
      ...validatedData,
      createdBy: (req as any).user.id,
      createdAt: new Date().toISOString(),
    };
    
    // Mock adding to the array
    mockTasks.push(newTask);
    
    res.status(201).json(newTask);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Validate request body
    const validatedData = taskSchema.parse(req.body);
    
    // Check for circular dependencies
    if (validatedData.dependencies && validatedData.dependencies.length > 0) {
      // In a real app, you would implement a cycle detection algorithm here
    }
    
    // Update task
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...validatedData,
    };
    
    res.json(mockTasks[taskIndex]);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Remove task
    const deletedTask = mockTasks.splice(taskIndex, 1)[0];
    
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 