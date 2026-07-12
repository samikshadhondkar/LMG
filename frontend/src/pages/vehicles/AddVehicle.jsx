import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createVehicle, updateVehicle } from '../../services/vehicleService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const vehicleSchema = z.object({
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  capacity: z.coerce.number().positive('Capacity must be greater than 0'),
  odometer: z.coerce.number().min(0).optional(),
  acquisitionCost: z.coerce.number().min(0).optional(),
});

const AddVehicle = ({ open, onOpenChange, onSuccess, editingVehicle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(vehicleSchema) });

  useEffect(() => {
    if (editingVehicle) {
      reset(editingVehicle);
    } else {
      reset({
        vehicleNumber: '',
        registrationNumber: '',
        vehicleType: '',
        capacity: '',
        odometer: 0,
        acquisitionCost: 0,
      });
    }
  }, [editingVehicle, open, reset]);

  const onSubmit = async (formData) => {
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle._id, formData);
        toast.success('Vehicle updated successfully');
      } else {
        await createVehicle(formData);
        toast.success('Vehicle added successfully');
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
          <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Vehicle Number (e.g. Van-05)" {...register('vehicleNumber')} />
            {errors.vehicleNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Registration Number" {...register('registrationNumber')} />
            {errors.registrationNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Vehicle Type (e.g. Van, Truck)" {...register('vehicleType')} />
            {errors.vehicleType && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
            )}
          </div>
          <div>
            <Input type="number" placeholder="Max Load Capacity (kg)" {...register('capacity')} />
            {errors.capacity && (
              <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
            )}
          </div>
          <div>
            <Input type="number" placeholder="Odometer (km)" {...register('odometer')} />
          </div>
          <div>
            <Input type="number" placeholder="Acquisition Cost" {...register('acquisitionCost')} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicle;