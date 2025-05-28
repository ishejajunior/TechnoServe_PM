import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Authentication middleware
 * 
 * In a real application, this would verify a JWT token using Firebase Admin SDK
 * For this demo, we're using a simple mock implementation
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    
    // Check the format (Bearer token)
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }
    
    const token = parts[1];
    
    // In a real app, you would verify the token with Firebase Admin SDK
    // For this demo, we'll just check if it starts with "mock_token_"
    if (!token.startsWith('mock_token_')) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Extract the user ID from the token
    const userId = token.replace('mock_token_', '');
    
    // Set the user in the request object
    // In a real app, you would decode the token to get user information
    req.user = {
      id: userId,
      email: 'user@example.com',
      role: 'TEAM_MEMBER', // Default role
    };
    
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Authentication failed: ' + error.message });
  }
};

/**
 * Role-based authorization middleware
 */
export const roleCheck = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    
    next();
  };
};

/**
 * Permission check middleware for resource access
 */
export const permissionCheck = (resourceType: string, action: 'READ' | 'WRITE' | 'DELETE' | 'ADMIN') => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get the resource ID from the request parameters
    const resourceId = req.params.id;
    
    if (!resourceId) {
      return res.status(400).json({ error: 'Resource ID is required' });
    }
    
    // In a real app, you would check the database for user permissions on this resource
    // For this demo, we'll use some simple rules:
    
    // Mock permission check
    if (req.user.role === 'SUPER_ADMIN') {
      // Super admins can do anything
      return next();
    } else if (req.user.role === 'TEAM_LEAD') {
      // Team leads can do anything except DELETE if they're not the owner
      if (action === 'DELETE') {
        // Check if they're the owner (in a real app, this would be a DB check)
        const isOwner = resourceId.includes(req.user.id);
        if (!isOwner) {
          return res.status(403).json({ error: 'Forbidden: Team leads can only delete their own resources' });
        }
      }
      return next();
    } else if (req.user.role === 'TEAM_MEMBER') {
      // Team members can READ anything, WRITE their own resources, and never DELETE
      if (action === 'DELETE') {
        return res.status(403).json({ error: 'Forbidden: Team members cannot delete resources' });
      } else if (action === 'WRITE' || action === 'ADMIN') {
        // Check if they're the owner or assignee (in a real app, this would be a DB check)
        const isInvolved = resourceId.includes(req.user.id);
        if (!isInvolved) {
          return res.status(403).json({ error: 'Forbidden: Team members can only modify their own resources' });
        }
      }
      return next();
    } else if (req.user.role === 'EXTERNAL_PARTNER') {
      // External partners can only READ specific resources they're invited to
      if (action !== 'READ') {
        return res.status(403).json({ error: 'Forbidden: External partners have read-only access' });
      }
      
      // Check if they have access to this specific resource (in a real app, this would be a DB check)
      const hasAccess = resourceId.includes('public') || resourceId.includes(req.user.id);
      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden: External partners can only access their invited resources' });
      }
      
      return next();
    }
    
    // Default deny
    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  };
}; 