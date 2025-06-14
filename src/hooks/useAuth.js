import { useAuthContext } from "../context/AuthContext";

// Custom hook to access auth context
export const useAuth = () => {
  return useAuthContext();
};
