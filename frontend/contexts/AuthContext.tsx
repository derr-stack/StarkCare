import { useStarknet } from '@starknet-react/core';
import { createContext, memo, ReactNode, useEffect, useState } from 'react';
import { Role } from 'src/types/User';
import { config } from 'src/config';
import axios from 'axios';
import { getChecksumAddress } from 'starknet';

const { apiUrl } = config;

export interface AuthContextType {
  userId: string;
  name: string;
  role: Role | null;
  error: string;
  loaded: boolean;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// AuthContextProvider is responsible for managing authentication state
export const AuthContextProvider = memo(({ children }: { children: ReactNode }) => {
  const { account } = useStarknet();
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<Role | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Effect to handle user authentication
  useEffect(() => {
    if (!account) {
      return;
    }

    const authenticateUser = async () => {
      try {
        // Initialize loading state
        setLoaded(false);

        const response = await axios.post(`${apiUrl}/auth/login`, {
          walletId: getChecksumAddress(account),
        });

        const { user, accessToken } = response.data.data;

        // Update state with user info
        setUserId(user.id);
        setName(user.name);
        setRole(user.role);
        setAccessToken(accessToken);
        setError(""); // Clear any previous errors
      } catch (error: any) {
        // Handle error
        setError(`Authentication failed: ${error.message}`);
      } finally {
        // Update loading state
        setLoaded(true);
      }
    };

    authenticateUser();
  }, [account]);

  return (
    <AuthContext.Provider
      value={{
        userId,
        name,
        role,
        error,
        loaded,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
