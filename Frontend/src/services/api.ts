import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a base API instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string): Promise<AxiosResponse> => 
    api.post('/auth/login', { email, password }),
  
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    department?: string;
    timezone?: string;
  }): Promise<AxiosResponse> => api.post('/auth/signup', userData),
  
  googleLogin: (tokenId: string): Promise<AxiosResponse> => 
    api.post('/auth/google', { tokenId }),
  
  getCurrentUser: (): Promise<AxiosResponse> => api.get('/auth/me'),
  
  logout: (): Promise<AxiosResponse> => api.post('/auth/logout'),
};

// Projects API
export const projectsAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    api.get('/projects', { params }),
  
  getById: (id: string): Promise<AxiosResponse> => 
    api.get(`/projects/${id}`),
  
  create: (projectData: {
    name: string;
    description?: string;
    status: string;
    priority: string;
    startDate: string;
    endDate: string;
  }): Promise<AxiosResponse> => api.post('/projects', projectData),
  
  update: (id: string, projectData: any): Promise<AxiosResponse> => 
    api.put(`/projects/${id}`, projectData),
  
  delete: (id: string): Promise<AxiosResponse> => 
    api.delete(`/projects/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    api.get('/tasks', { params }),
  
  getById: (id: string): Promise<AxiosResponse> => 
    api.get(`/tasks/${id}`),
  
  getByProject: (projectId: string): Promise<AxiosResponse> => 
    api.get('/tasks', { params: { projectId } }),
  
  create: (taskData: {
    projectId: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    assigneeId?: string;
    dueDate?: string;
    dependencies?: string[];
  }): Promise<AxiosResponse> => api.post('/tasks', taskData),
  
  update: (id: string, taskData: any): Promise<AxiosResponse> => 
    api.put(`/tasks/${id}`, taskData),
  
  updateStatus: (id: string, status: string): Promise<AxiosResponse> => 
    api.put(`/tasks/${id}`, { status }),
  
  delete: (id: string): Promise<AxiosResponse> => 
    api.delete(`/tasks/${id}`),
};

// Users API
export const usersAPI = {
  getAll: (): Promise<AxiosResponse> => api.get('/users'),
  
  getById: (id: string): Promise<AxiosResponse> => 
    api.get(`/users/${id}`),
  
  getByProject: (projectId: string): Promise<AxiosResponse> => 
    api.get(`/users/project/${projectId}`),
  
  update: (id: string, userData: any): Promise<AxiosResponse> => 
    api.put(`/users/${id}`, userData),
};

// Default export
export default {
  auth: authAPI,
  projects: projectsAPI,
  tasks: tasksAPI,
  users: usersAPI,
}; 