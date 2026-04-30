import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import * as taskService from '../services/task.service';
import toast from 'react-hot-toast';

const statusColors = {
  TODO: 'bg-gray-200 text-gray-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
};
const priorityColors = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
};

export default function TaskCard({ task, onUpdate, onDelete, onEdit }) {
  const { user } = useAuth();
  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';
  const canEdit = user.role === 'ADMIN' || task.assignedToId === user.id;

  const changeStatus = async (status) => {
    try {
      await taskService.updateStatus(task.id, status);
      toast.success('Status updated');
      onUpdate?.();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className={`card ${overdue ? 'border-red-300' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && <p className="text-sm text-gray-600 mb-2">{task.description}</p>}
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
        {task.assignedTo && <span>👤 {task.assignedTo.name}</span>}
        {task.dueDate && (
          <span className={overdue ? 'text-red-600 font-semibold' : ''}>
            📅 {format(new Date(task.dueDate), 'MMM dd')}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        {canEdit ? (
          <select value={task.status} onChange={(e) => changeStatus(e.target.value)}
            className={`text-xs rounded px-2 py-1 ${statusColors[task.status]}`}>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        ) : (
          <span className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}>
            {task.status}
          </span>
        )}
        {user.role === 'ADMIN' && (
          <div className="flex gap-2">
            <button onClick={() => onEdit?.(task)} className="text-xs text-indigo-600">Edit</button>
            <button onClick={() => onDelete?.(task.id)} className="text-xs text-red-600">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}