"use client"

import { createContext } from 'react';
import useToken from '../hooks/use-token';
import { SportigoUser } from '@/app/api/member/_get-user/get-user-by-token';

interface UserContext {
  sportigoUser: SportigoUser | undefined;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const UserContext = createContext({
  sportigoUser: undefined as SportigoUser | undefined,
  token: '' as string | null,
  setToken: (token: string) => console.log("Error"),
  logout: () => console.log("Error"),
});

export const UserProvider = ({ children }: any) => {
  const {sportigoUser, token, setToken, logout} = useToken();

  return (
    <UserContext.Provider value={{ sportigoUser, token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};