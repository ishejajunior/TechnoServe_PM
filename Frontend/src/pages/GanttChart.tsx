import React from 'react';
import { useParams } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Project Planning',
    startDate: '2023-10-01',
    endDate: '2023-10-15',
    progress: 100
  },
  {
    id: '2',
    title: 'Design Garden Layout',
    startDate: '2023-10-15',
    endDate: '2023-10-30',
    progress: 100,
    dependencies: ['1']
  },
  {
    id: '3',
    title: 'Recruit Volunteers',
    startDate: '2023-10-20',
    endDate: '2023-11-10',
    progress: 100,
    dependencies: ['1']
  },
  {
    id: '4',
    title: 'Prepare Garden Beds',
    startDate: '2023-11-01',
    endDate: '2023-11-15',
    progress: 60,
    dependencies: ['2']
  },
  {
    id: '5',
    title: 'Source Seedlings',
    startDate: '2023-11-05',
    endDate: '2023-11-20',
    progress: 40,
    dependencies: ['2']
  },
  {
    id: '6',
    title: 'Install Irrigation System',
    startDate: '2023-11-15',
    endDate: '2023-12-01',
    progress: 30,
    dependencies: ['4']
  },
  {
    id: '7',
    title: 'Plant Garden',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    progress: 0,
    dependencies: ['5', '6']
  }
];

// Simple function to calculate position on timeline
const calculatePosition = (date: string, startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const current = new Date(date).getTime();
  
  const projectDuration = end - start;
  const taskProgress = current - start;
  
  return Math.max(0, Math.min(100, (taskProgress / projectDuration) * 100));
};

const calculateWidth = (taskStart: string, taskEnd: string, projectStart: string, projectEnd: string): number => {
  const projectStartTime = new Date(projectStart).getTime();
  const projectEndTime = new Date(projectEnd).getTime();
  const taskStartTime = new Date(taskStart).getTime();
  const taskEndTime = new Date(taskEnd).getTime();
  
  const projectDuration = projectEndTime - projectStartTime;
  const taskDuration = taskEndTime - taskStartTime;
  
  return (taskDuration / projectDuration) * 100;
};

const GanttChart: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Find the earliest start date and latest end date
  const projectStart = mockTasks.reduce((earliest, task) => 
    new Date(task.startDate) < new Date(earliest) ? task.startDate : earliest, 
    mockTasks[0].startDate
  );
  
  const projectEnd = mockTasks.reduce((latest, task) => 
    new Date(task.endDate) > new Date(latest) ? task.endDate : latest, 
    mockTasks[0].endDate
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community Garden Initiative</h1>
        <p className="mt-1 text-sm text-gray-500">Enhancing community well-being through collaborative gardening efforts.</p>
        
        <div className="mt-4 flex space-x-4">
          <button className="bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Kanban
          </button>
          <button className="bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-b-2 border-blue-500">
            Gantt
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-900">Project Timeline</h2>
            <div className="text-sm text-gray-500">
              {new Date(projectStart).toLocaleDateString()} - {new Date(projectEnd).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* Timeline header */}
          <div className="flex border-b">
            <div className="w-1/4 p-4 font-medium text-gray-700">Task</div>
            <div className="w-3/4 p-4 font-medium text-gray-700">Timeline</div>
          </div>
          
          {/* Tasks */}
          {mockTasks.map((task) => (
            <div key={task.id} className="flex border-b hover:bg-gray-50">
              <div className="w-1/4 p-4">
                <div className="font-medium text-gray-900">{task.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="w-3/4 p-4 relative">
                <div className="h-6 bg-gray-100 rounded">
                  <div 
                    className="absolute h-6 bg-blue-500 rounded opacity-75"
                    style={{ 
                      left: `${calculatePosition(task.startDate, projectStart, projectEnd)}%`,
                      width: `${calculateWidth(task.startDate, task.endDate, projectStart, projectEnd)}%` 
                    }}
                  ></div>
                  
                  <div 
                    className="absolute h-6 bg-green-500 rounded"
                    style={{ 
                      left: `${calculatePosition(task.startDate, projectStart, projectEnd)}%`,
                      width: `${calculateWidth(task.startDate, task.endDate, projectStart, projectEnd) * (task.progress / 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart; 