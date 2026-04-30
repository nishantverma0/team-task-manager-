import { useState, useEffect } from 'react';
import * as taskService from '../services/task.service';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function TaskModal({ projectId, members, task, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'MEDIUM', dueDate: '', assignedToId: '',
  });

  useEffect(() => {
    if (task) setForm({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'MEDIUM',
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      assignedToId: task.assignedToId || '',
    });
  }, [task]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (task) await taskService.updateTask(task.id, form);
      else await taskService.createTask(projectId, form);
      toast.success(task ? 'Task updated' : 'Task created');
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
        <input className="input mb-3" placeholder="Title" required
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="input mb-3" placeholder="Description" rows="3"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select className="input mb-3" value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input type="date" className="input mb-3" value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <select className="input mb-4" value={form.assignedToId}
          onChange={(e) => setForm({ ...form, assignedToId: e.target.value })}>
          <option value="">Unassigned</option>
          {members?.map((m) => (
            <option key={m.user.id} value={m.user.id}>{m.user.name}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">{task ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}