import React from 'react';
import { useParams } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
  dueDate?: string;
  imageUrl?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 't1',
        title: 'Prepare Garden Beds',
        description: 'Clear weeds, till soil, and add compost to the designated garden areas.',
        priority: 'High',
        imageUrl: 'https://example.com/garden-beds.jpg'
      },
      {
        id: 't2',
        title: 'Source Seedlings',
        description: 'Identify and procure a variety of vegetable and flower seedlings from local nurseries.',
        priority: 'Medium',
        imageUrl: 'https://example.com/seedlings.jpg'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 't3',
        title: 'Install Irrigation System',
        description: 'Set up a drip irrigation system to ensure efficient watering of the garden beds.',
        priority: 'High',
        imageUrl: 'https://example.com/irrigation.jpg'
      }
    ]
  },
  {
    id: 'completed',
    title: 'Completed',
    tasks: [
      {
        id: 't4',
        title: 'Design Garden Layout',
        description: 'Create a detailed layout plan for the garden, including placement of plants and pathways.',
        priority: 'High',
        imageUrl: 'https://example.com/garden-layout.jpg'
      },
      {
        id: 't5',
        title: 'Recruit Volunteers',
        description: 'Organize and conduct volunteer recruitment efforts to gather support for the project.',
        priority: 'Medium',
        imageUrl: 'https://example.com/volunteers.jpg'
      }
    ]
  }
];

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'High':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'Medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'Low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const KanbanBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community Garden Initiative</h1>
        <p className="mt-1 text-sm text-gray-500">Enhancing community well-being through collaborative gardening efforts.</p>
        
        <div className="mt-4 flex space-x-4">
          <button className="bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b-2 border-blue-500">
            Kanban
          </button>
          <button className="bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Gantt
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {mockColumns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">{column.title}</h3>
            
            <div className="space-y-4">
              {column.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="mb-2">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                  
                  {task.imageUrl && (
                    <div className="mt-4">
                      <img 
                        src={task.imageUrl} 
                        alt={task.title} 
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 