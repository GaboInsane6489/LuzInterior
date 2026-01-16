import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../features/auth/context/AuthProvider";

export const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <AuthProvider>{children}</AuthProvider>
    </HelmetProvider>
  );
};
