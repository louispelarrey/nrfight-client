import { createContext } from 'react';
import useToken from '../hooks/useToken';

interface UserContext {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}


export const UserContext = createContext({
  token: '' as string | null,
  setToken: (token: string) => console.log("Error"),
  logout: () => console.log("Error"),
});

export const UserProvider = ({ children }: any) => {
  const {token, setToken, logout} = useToken();

  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};