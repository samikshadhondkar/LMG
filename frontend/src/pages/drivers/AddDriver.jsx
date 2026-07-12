import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createDriver, updateDriver } from '../../services/driverService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const driverSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Contact number is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseCategory: z.string().optional(),
  licenseExpiry: z.string().min(1, 'License expiry date is required'),
  safetyScore: z.coerce.number().min(0).max(100).optional(),
});

const AddDriver = ({ open, onOpenChange, onSuccess, editingDriver }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(driverSchema) });

  useEffect(() => {
    if (editingDriver) {
      reset({
        ...editingDriver,
        licenseExpiry: editingDriver.licenseExpiry
          ? editingDriver.licenseExpiry.slice(0, 10)
          : '',
      });
    } else {
      reset({
        name: '',
        phone: '',
        licenseNumber: '',
        licenseCategory: '',
        licenseExpiry: '',
        safetyScore: 100,
      });
    }
  }, [editingDriver, open, reset]);

  const onSubmit = async (formData) => {
    try {
      if (editingDriver) {
        await updateDriver(editingDriver._id, formData);
        toast.success('Driver updated successfully');
      } else {
        await createDriver(formData);
        toast.success('Driver added successfully');
      }
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingDriver ? 'Edit Driver' : 'Add Driver'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full Name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder="Contact Number" {...register('phone')} />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Input placeholder="License Number" {...register('licenseNumber')} />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="License Category (e.g. LMV)" {...register('licenseCategory')} />
          </div>
          <div>
            <Input type="date" placeholder="License Expiry" {...register('licenseExpiry')} />
            {errors.licenseExpiry && (
              <p className="text-red-500 text-sm mt-1">{errors.licenseExpiry.message}</p>
            )}
          </div>
          <div>
            <Input type="number" placeholder="Safety Score (0-100)" {...register('safetyScore')} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingDriver ? 'Update Driver' : 'Add Driver'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriver;