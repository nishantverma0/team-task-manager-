import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectModal from '../components/ProjectModal';
import * as projectService from '../services/project.service';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const load = () => projectService.getProjects().then((r) => setProjects(r.data));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      toast.success('Project deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          {user.role === 'ADMIN' && (
            <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center gap-1">
              <Plus size={18} /> New Project
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="card hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/projects/${p.id}`} className="text-lg font-semibold text-indigo-700 hover:underline">
                  {p.name}
                </Link>
                {user.role === 'ADMIN' && (
                  <button onClick={() => remove(p.id)} className="text-red-500"><Trash2 size={16} /></button>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{p.description || 'No description'}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>👥 {p.members.length} members</span>
                <span>📋 {p._count.tasks} tasks</span>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-500">No projects yet</p>}
        </div>
      </div>
      {showModal && <ProjectModal onClose={() => setShowModal(false)}
        onSaved={() => { setShowModal(false); load(); }} />}
    </div>
  );
}