import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getVehicles, deleteVehicle } from '../../services/vehicleService';
import PageTitle from '../../components/shared/PageTitle';
import SearchBar from '../../components/shared/SearchBar';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import Loader from '../../components/shared/Loader';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { Button } from '../../components/ui/button';
import AddVehicle from './AddVehicle';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getVehicles(search ? { search } : {});
      setVehicles(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchVehicles, 300); // debounce search
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async () => {
    try {
      await deleteVehicle(deleteTarget._id);
      toast.success('Vehicle deleted successfully');
      setDeleteTarget(null);
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete vehicle');
    }
  };

  const columns = [
    { header: 'Vehicle Number', accessorKey: 'vehicleNumber' },
    { header: 'Registration No.', accessorKey: 'registrationNumber' },
    { header: 'Type', accessorKey: 'vehicleType' },
    { header: 'Capacity (kg)', accessorKey: 'capacity' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditingVehicle(row);
              setFormOpen(true);
            }}
          >
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <PageTitle
        title="Vehicles"
        action={
          <Button
            onClick={() => {
              setEditingVehicle(null);
              setFormOpen(true);
            }}
          >
            + Add Vehicle
          </Button>
        }
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by vehicle number or registration..."
      />

      {loading ? <Loader /> : <DataTable columns={columns} data={vehicles} />}

      <AddVehicle
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={fetchVehicles}
        editingVehicle={editingVehicle}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Vehicle"
        message={`Are you sure you want to delete "${deleteTarget?.vehicleNumber}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default VehicleList;