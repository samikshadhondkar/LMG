import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getDrivers, deleteDriver } from '../../services/driverService';
import PageTitle from '../../components/shared/PageTitle';
import SearchBar from '../../components/shared/SearchBar';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import Loader from '../../components/shared/Loader';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { Button } from '../../components/ui/button';
import AddDriver from './AddDriver';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await getDrivers(search ? { search } : {});
      setDrivers(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load drivers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchDrivers, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async () => {
    try {
      await deleteDriver(deleteTarget._id);
      toast.success('Driver deleted successfully');
      setDeleteTarget(null);
      fetchDrivers();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete driver');
    }
  };

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'License No.', accessorKey: 'licenseNumber' },
    {
      header: 'License Expiry',
      cell: (row) => new Date(row.licenseExpiry).toLocaleDateString(),
    },
    { header: 'Safety Score', accessorKey: 'safetyScore' },
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
              setEditingDriver(row);
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
        title="Drivers"
        action={
          <Button
            onClick={() => {
              setEditingDriver(null);
              setFormOpen(true);
            }}
          >
            + Add Driver
          </Button>
        }
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name, license number, or phone..."
      />

      {loading ? <Loader /> : <DataTable columns={columns} data={drivers} />}

      <AddDriver
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={fetchDrivers}
        editingDriver={editingDriver}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Driver"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default DriverList;