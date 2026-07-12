const statusColors = {
  Available: 'bg-green-100 text-green-700',
  'On Trip': 'bg-blue-100 text-blue-700',
  'In Shop': 'bg-yellow-100 text-yellow-700',
  Retired: 'bg-gray-100 text-gray-600',
  'Off Duty': 'bg-gray-100 text-gray-600',
  Suspended: 'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }) => {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};


export default StatusBadge;