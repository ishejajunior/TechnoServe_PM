import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  startDate: string;
  endDate: string;
  progress: number;
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    priority: 'High' | 'Medium' | 'Low';
    assignee?: string;
    dueDate?: string;
  }>;
}

const mockProject: Project = {
  id: '1',
  name: 'Community Garden Initiative',
  description: 'Enhancing community well-being through collaborative gardening efforts. This project aims to create a sustainable community garden that provides fresh produce and educational opportunities for local residents.',
  status: 'Active',
  startDate: '2023-10-01',
  endDate: '2023-12-31',
  progress: 65,
  team: [
    {
      id: 'u1',
      name: 'Sarah Johnson',
      role: 'Project Lead',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 'u2',
      name: 'Michael Rodriguez',
      role: 'Garden Designer',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 'u3',
      name: 'Emily Chen',
      role: 'Volunteer Coordinator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 'u4',
      name: 'David Okafor',
      role: 'Community Liaison',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  tasks: [
    {
      id: 't1',
      title: 'Prepare Garden Beds',
      status: 'To Do',
      priority: 'High',
      assignee: 'Michael Rodriguez',
      dueDate: '2023-11-15',
    },
    {
      id: 't2',
      title: 'Source Seedlings',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Sarah Johnson',
      dueDate: '2023-11-20',
    },
    {
      id: 't3',
      title: 'Install Irrigation System',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Michael Rodriguez',
      dueDate: '2023-12-01',
    },
    {
      id: 't4',
      title: 'Design Garden Layout',
      status: 'Done',
      priority: 'High',
      assignee: 'Michael Rodriguez',
      dueDate: '2023-10-30',
    },
    {
      id: 't5',
      title: 'Recruit Volunteers',
      status: 'Done',
      priority: 'Medium',
      assignee: 'Emily Chen',
      dueDate: '2023-11-10',
    },
  ],
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'Planning':
      return 'bg-blue-100 text-blue-800';
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-gray-100 text-gray-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTaskStatusColor = (status: string) => {
  switch (status) {
    case 'To Do':
      return 'bg-gray-100 text-gray-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Review':
      return 'bg-blue-100 text-blue-800';
    case 'Done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'text-red-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Low':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = mockProject; // In a real app, you would fetch this based on projectId
  
  const tasksByStatus = {
    todo: project.tasks.filter(task => task.status === 'To Do'),
    inProgress: project.tasks.filter(task => task.status === 'In Progress'),
    review: project.tasks.filter(task => task.status === 'Review'),
    done: project.tasks.filter(task => task.status === 'Done')
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Overview Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Overview</h3>
            <div className="mt-5 grid grid-cols-1 gap-5">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Start Date</div>
                <div className="text-sm text-gray-900">{new Date(project.startDate).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">End Date</div>
                <div className="text-sm text-gray-900">{new Date(project.endDate).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">Progress</div>
                <div className="text-sm text-gray-900">{project.progress}%</div>
              </div>
              <div className="pt-2">
                <div className="relative">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${project.progress}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link to={`/projects/${project.id}/kanban`} className="font-medium text-blue-600 hover:text-blue-500">
                View Kanban Board
              </Link>
            </div>
          </div>
        </div>

        {/* Team Members Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Team Members</h3>
            <ul className="mt-5 divide-y divide-gray-200">
              {project.team.map((member) => (
                <li key={member.id} className="py-4 flex">
                  <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button className="font-medium text-blue-600 hover:text-blue-500">
                Add Team Member
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Overview Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks Overview</h3>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-md p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{tasksByStatus.todo.length}</div>
                <div className="text-sm text-gray-500">To Do</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{tasksByStatus.inProgress.length}</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{tasksByStatus.review.length}</div>
                <div className="text-sm text-gray-500">Review</div>
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900">{tasksByStatus.done.length}</div>
                <div className="text-sm text-gray-500">Done</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link to={`/projects/${project.id}/gantt`} className="font-medium text-blue-600 hover:text-blue-500">
                View Gantt Chart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
          <button 
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
        
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Task
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Priority
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Assignee
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {project.tasks.map((task) => (
                <tr key={task.id}>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                    {task.title}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getTaskStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className={`px-3 py-4 text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {task.assignee}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 