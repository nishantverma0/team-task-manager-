import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FolderKanban, ListTodo } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
          📋 TaskManager
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/projects" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
            <FolderKanban size={18} /> Projects
          </Link>
          <Link to="/my-tasks" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
            <ListTodo size={18} /> My Tasks
          </Link>
          <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            {user?.name} • {user?.role}
          </span>
          <button onClick={() => { logout(); nav('/login'); }}
            className="flex items-center gap-1 text-red-600 hover:text-red-800">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}