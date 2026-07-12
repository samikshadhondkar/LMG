import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import VehicleList from '../pages/vehicles/VehicleList';
import DriverList from '../pages/drivers/DriverList';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/drivers" element={<DriverList />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;