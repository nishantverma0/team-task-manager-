import { useEffect, useState } from 'react';
import * as projectService from '../services/project.service';
import toast from 'react-hot-toast';

export default function MemberModal({ projectId, currentMembers, onClose, onSaved }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    projectService.getUsers().then((r) => setUsers(r.data));
  }, []);

  const memberIds = currentMembers.map((m) => m.user.id);
  const available = users.filter((u) => !memberIds.includes(u.id));

  const add = async (e) => {
    e.preventDefault();
    try {
      await projectService.addMember(projectId, selected);
      toast.success('Member added');
      onSaved();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={add} className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Member</h2>
        <select className="input mb-4" required value={selected}
          onChange={(e) => setSelected(e.target.value)}>
          <option value="">Select user...</option>
          {available.map((u) => (
            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}