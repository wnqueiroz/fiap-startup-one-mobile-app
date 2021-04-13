import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/gamification';

interface GamificationContextData {
    userProgress: any
    ranking: any[]
    fetchUserProgress(): Promise<void>
    fetchRanking(): Promise<void>
}

const GamificationContext = createContext({} as GamificationContextData);

export const GamificationProvider: React.FC = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [ranking, setRanking] = useState([]);

  async function fetchUserProgress(): Promise<void> {
    const response = await api.getMe();

    setUserProgress(response);
  }

  async function fetchRanking(): Promise<void> {
    const response = await api.getRanking();

    setRanking(response);
  }

  return (
    <GamificationContext.Provider value={{
      userProgress,
      ranking,
      fetchUserProgress,
      fetchRanking,
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
