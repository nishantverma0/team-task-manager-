import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      nav('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const fill = (email, password) => setForm({ email, password });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">📋 TaskManager</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>

        {/* Demo Credentials Box */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 text-sm">
          <p className="font-semibold text-indigo-900 mb-2">🔑 Demo Credentials</p>
          <div className="space-y-2">
            <button type="button" onClick={() => fill('admin@demo.com', 'Admin@123')}
              className="w-full text-left bg-white px-3 py-2 rounded border hover:border-indigo-400">
              <span className="font-medium">Admin:</span> admin@demo.com / Admin@123
            </button>
            <button type="button" onClick={() => fill('member@demo.com', 'Member@123')}
              className="w-full text-left bg-white px-3 py-2 rounded border hover:border-indigo-400">
              <span className="font-medium">Member:</span> member@demo.com / Member@123
            </button>
          </div>
          <p className="text-xs text-indigo-700 mt-2">Click to auto-fill</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input type="email" className="input" placeholder="Email" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" className="input" placeholder="Password" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          No account? <Link to="/signup" className="text-indigo-600 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}