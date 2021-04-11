import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import { ASYNC_STORAGE_KEYS } from '../contants';
import * as api from '../services/api';
import { useStatusBar } from './statusBar';

type User = {
  name: string
}

interface AuthContextData {
  signed: boolean
  loading: boolean
  user: User | null
  signIn(params: { email: string, password: string }): Promise<void>
  logout(): Promise<void>
  signUp(params: { name: string, email: string, password: string }): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { setColor } = useStatusBar();

  function setApiInstanceToken(authToken: string): void {
    api.instance.defaults.headers.Authorization = `Bearer ${authToken}`;
  }

  async function signIn(params: { email: string, password: string }) : Promise<void> {
    setLoading(true);

    const response = await api.signIn({
      email: params.email,
      password: params.password,
    });

    const { access_token: authToken } = response;

    setApiInstanceToken(authToken);

    const userData = jwtDecode(authToken) as User;

    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN, authToken);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_USER, JSON.stringify(
      userData,
    ));

    setUser(userData);
    setLoading(false);
  }

  async function signUp(params: {
    name: string,
     email: string,
      password: string
    }) : Promise<void> {
    setLoading(true);

    const response = await api.signUp({
      name: params.name,
      email: params.email,
      password: params.password,
      passwordConfirmation: params.password,
    });

    const { access_token: authToken, ...userData } = response;

    setApiInstanceToken(authToken);

    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN, authToken);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_USER, JSON.stringify(
      userData,
    ));

    setUser(userData);
    setLoading(false);
  }

  async function logout(): Promise<void> {
    setLoading(true);
    setColor('#FFF'); // TODO: this only fix status bar color, remove later

    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN, '');
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_USER, '');

    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    async function loadAsyncStorageData(): Promise<void> {
      const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
        ASYNC_STORAGE_KEYS.AUTH_USER,
        ASYNC_STORAGE_KEYS.AUTH_TOKEN,
      ]);

      if (storagedUser[1] && storagedToken[1]) {
        setUser(JSON.parse(storagedUser[1]));
        setApiInstanceToken(storagedToken[1]);
      }

      setLoading(false);
    }

    loadAsyncStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      signed: !!user, user, signIn, signUp, loading, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
