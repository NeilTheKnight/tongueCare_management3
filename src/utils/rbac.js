import { useSelector } from 'react-redux';

const roleHierarchy = {
  admin: ['admin', 'agent', 'clinic_admin', 'doctor'],
  agent: ['agent'],
  clinic_admin: ['clinic_admin', 'doctor'],
  doctor: ['doctor']
};

export const useAuthorization = () => {
  const { user } = useSelector((state) => state.auth);

  const checkPermission = (requiredRole) => {
    if (!user) return false;
    return roleHierarchy[user.role].includes(requiredRole);
  };

  return { checkPermission };
};

export const withAuthorization = (WrappedComponent, requiredRole) => {
  return (props) => {
    const { checkPermission } = useAuthorization();
    if (!checkPermission(requiredRole)) {
      return <div>You don't have permission to access this page.</div>;
    }
    return <WrappedComponent {...props} />;
  };
};