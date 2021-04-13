import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/gamification';

interface GamificationContextData {
    userProgress: any
    ranking: any[]
    availableCoupons: any[]
    fetchUserProgress(): Promise<void>
    fetchRanking(): Promise<void>
    fetchAvailableCoupons(): Promise<void>
}

const GamificationContext = createContext({} as GamificationContextData);

export const GamificationProvider: React.FC = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  async function fetchUserProgress(): Promise<void> {
    const response = await api.getMe();

    setUserProgress(response);
  }

  async function fetchRanking(): Promise<void> {
    const response = await api.getRanking();

    setRanking(response);
  }

  async function fetchAvailableCoupons(): Promise<void> {
    const response = await api.getCoupons();

    setAvailableCoupons(response);
  }

  return (
    <GamificationContext.Provider value={{
      userProgress,
      ranking,
      availableCoupons,
      fetchUserProgress,
      fetchRanking,
      fetchAvailableCoupons,
    }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextData => {
  const context = useContext(GamificationContext);

  return context;
};
