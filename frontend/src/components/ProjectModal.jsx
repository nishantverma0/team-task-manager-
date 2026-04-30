import { useState } from 'react';
import * as projectService from '../services/project.service';
import toast from 'react-hot-toast';

export default function ProjectModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name: '', description: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await projectService.createProject(form);
      toast.success('Project created');
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">New Project</h2>
        <input className="input mb-3" placeholder="Name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea className="input mb-4" placeholder="Description" rows="3"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}