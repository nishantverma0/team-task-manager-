import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import * as taskService from '../services/task.service';
import { CheckCircle, Clock, AlertCircle, ListTodo, FolderKanban, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { taskService.getStats().then((r) => setData(r.data)); }, []);

  if (!data) return <div><Navbar /><p className="p-8 text-center">Loading...</p></div>;
  const { stats, overdueTasks } = data;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="Projects" value={stats.projects} color="indigo" icon={<FolderKanban />} />
          <StatCard label="Total Tasks" value={stats.total} color="blue" icon={<ListTodo />} />
          <StatCard label="To Do" value={stats.todo} color="gray" icon={<Clock />} />
          <StatCard label="In Progress" value={stats.inProgress} color="yellow" icon={<Loader2 />} />
          <StatCard label="Done" value={stats.done} color="green" icon={<CheckCircle />} />
          <StatCard label="Overdue" value={stats.overdue} color="red" icon={<AlertCircle />} />
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> Overdue Tasks
          </h2>
          {overdueTasks.length === 0 ? (
            <p className="text-gray-500">🎉 No overdue tasks!</p>
          ) : (
            <ul className="space-y-3">
              {overdueTasks.map((t) => (
                <li key={t.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-gray-500">
                      {t.project.name} • {t.assignedTo?.name || 'Unassigned'}
                    </p>
                  </div>
                  <span className="text-red-600 text-sm">
                    {format(new Date(t.dueDate), 'MMM dd')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}