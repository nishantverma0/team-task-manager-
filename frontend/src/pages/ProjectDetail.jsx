import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import MemberModal from '../components/MemberModal';
import * as projectService from '../services/project.service';
import * as taskService from '../services/task.service';
import { useAuth } from '../context/AuthContext';
import { Plus, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [showTask, setShowTask] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const load = () => projectService.getProject(id).then((r) => setProject(r.data));
  useEffect(() => { load(); }, [id]);

  const removeTask = async (taskId) => {
    if (!confirm('Delete task?')) return;
    await taskService.deleteTask(taskId);
    toast.success('Task deleted'); load();
  };

  if (!project) return <div><Navbar /><p className="p-8">Loading...</p></div>;

  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];
  const labels = { TODO: 'To Do', IN_PROGRESS: 'In Progress', DONE: 'Done' };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              👥 {project.members.length} members • 📋 {project.tasks.length} tasks
            </p>
          </div>
          {user.role === 'ADMIN' && (
            <div className="flex gap-2">
              <button onClick={() => setShowMember(true)} className="btn btn-secondary flex items-center gap-1">
                <UserPlus size={16} /> Add Member
              </button>
              <button onClick={() => { setEditTask(null); setShowTask(true); }}
                className="btn btn-primary flex items-center gap-1">
                <Plus size={16} /> New Task
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((status) => (
            <div key={status} className="bg-gray-100 rounded-xl p-4">
              <h2 className="font-bold mb-3">{labels[status]} ({project.tasks.filter(t => t.status === status).length})</h2>
              <div className="space-y-3">
                {project.tasks.filter(t => t.status === status).map((t) => (
                  <TaskCard key={t.id} task={t}
                    onUpdate={load}
                    onDelete={removeTask}
                    onEdit={(task) => { setEditTask(task); setShowTask(true); }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showTask && <TaskModal projectId={id} task={editTask} members={project.members}
        onClose={() => setShowTask(false)}
        onSaved={() => { setShowTask(false); load(); }} />}
      {showMember && <MemberModal projectId={id} currentMembers={project.members}
        onClose={() => setShowMember(false)}
        onSaved={() => { setShowMember(false); load(); }} />}
    </div>
  );
}