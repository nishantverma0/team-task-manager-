export default function StatCard({ label, value, color = 'indigo', icon }) {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
      </div>
      <div className={`text-${color}-500`}>{icon}</div>
    </div>
  );
}