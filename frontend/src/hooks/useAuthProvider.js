import React, { useContext } from "react";
import { authProvider } from "../providers/AuthProvider";
const useAuthProvider = () => {
  const ctx = useContext(authProvider);
  if (!ctx) {
    throw new Error("The hook useAuthProvider must be in <AuthProvider>.");
  }
  return ctx;
};

export default useAuthProvider;
