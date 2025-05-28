import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  progress: number;
  dueDate: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Community Garden Initiative',
    description: 'Enhancing community well-being through collaborative gardening efforts.',
    status: 'Active',
    progress: 65,
    dueDate: '2023-12-15',
  },
  {
    id: '2',
    name: 'Youth Entrepreneurship Program',
    description: 'Empowering young entrepreneurs with skills and resources.',
    status: 'Planning',
    progress: 20,
    dueDate: '2024-03-30',
  },
  {
    id: '3',
    name: 'Clean Water Access Project',
    description: 'Providing clean water solutions to underserved communities.',
    status: 'On Hold',
    progress: 40,
    dueDate: '2023-11-01',
  },
  {
    id: '4',
    name: 'Digital Literacy Campaign',
    description: 'Bridging the digital divide through education and technology access.',
    status: 'Completed',
    progress: 100,
    dueDate: '2023-09-15',
  }
];

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

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Create New Project
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Projects</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">12</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Active Projects</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">4</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Completed Projects</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">6</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Team Members</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24</dd>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Projects</h2>
      
      <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Project Name
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Description
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Progress
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockProjects.map((project) => (
              <tr key={project.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                  <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </td>
                <td className="hidden max-w-xs truncate px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {project.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-blue-600" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{project.progress}%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Date(project.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard; 