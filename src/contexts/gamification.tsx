import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/gamification';

interface GamificationContextData {
    userProgress: any
    ranking: any[]
    availableCoupons: any[]
    rescuedCoupons: any[]
    fetchUserProgress(): Promise<void>
    fetchRanking(): Promise<void>
    fetchAvailableCoupons(): Promise<void>
    rescueCoupon(idCoupon: string): Promise<void>
    fetchRescuedCoupons(): Promise<void>
}

const GamificationContext = createContext({} as GamificationContextData);

export const GamificationProvider: React.FC = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [rescuedCoupons, setRescuedCoupons] = useState([]);

  async function fetchUserProgress(): Promise<void> {
    const response = await api.getMe();

    setUserProgress(response);
  }

  async function rescueCoupon(idCoupon: string): Promise<void> {
    await api.rescueCoupon(idCoupon);
  }

  async function fetchRanking(): Promise<void> {
    const response = await api.getRanking();

    setRanking(response);
  }

  async function fetchRescuedCoupons(): Promise<void> {
    const response = await api.getRescuedCoupons();

    setRescuedCoupons(response);
  }

  async function fetchAvailableCoupons(): Promise<void> {
    const response = await api.getCoupons();

    setAvailableCoupons(response);
  }

  return (
    <GamificationContext.Provider value={{
      userProgress,
      ranking,
      rescuedCoupons,
      availableCoupons,
      fetchUserProgress,
      fetchRanking,
      fetchAvailableCoupons,
      rescueCoupon,
      fetchRescuedCoupons,
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
