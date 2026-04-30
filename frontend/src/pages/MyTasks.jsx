import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import * as taskService from '../services/task.service';

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const load = () => taskService.myTasks().then((r) => setTasks(r.data));
  useEffect(() => { load(); }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned to you</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((t) => (
              <div key={t.id}>
                <p className="text-xs text-gray-500 mb-1">📁 {t.project.name}</p>
                <TaskCard task={t} onUpdate={load} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}