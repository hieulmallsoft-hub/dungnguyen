import { Navigate, useLocation } from 'react-router-dom';
import { getAuthSession, isAdminSession } from '../../data/authStorage';

function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const session = getAuthSession();

  if (!isAdminSession(session)) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedAdminRoute;
