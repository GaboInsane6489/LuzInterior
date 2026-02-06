import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refreshProfile: () => {},
});
