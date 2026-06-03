import React, { useContext } from "react";
import { AuthContext } from "../providers/authContext";
const useAuthProvider = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("The hook useAuthProvider must be in <AuthProvider>.");
  }
  return ctx;
};

export default useAuthProvider;
