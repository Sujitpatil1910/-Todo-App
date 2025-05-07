import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Optional: You can handle the loading state if you need to show a loader while checking auth
  if (loading) {
    return <div>Loading...</div>;  // You can show a loading spinner here instead
  }

  // If there's no user, redirect to login
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
