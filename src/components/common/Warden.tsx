import { FC, ReactNode } from 'react';
import useWarden from '../../hooks/Warden.ts';
import {Navigate} from "react-router-dom";
import {useAuth} from "../../provider/AuthProvider.tsx";

const Warden: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
   useWarden();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default Warden;
