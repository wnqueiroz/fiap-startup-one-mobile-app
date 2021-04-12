import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/appointments';

interface AppointmentContextData {
    appointments: any[]
    nextAppointment: any
    searchServicesResults: any
    fetchAppointments(): Promise<void>
    fetchNextAppointment(): Promise<void>
    searchServices(searchTerms: string): Promise<void>
    clearSearchServices(): void
    fetchAll(): Promise<[void, void]>
    cancelAppointment(idAppointment: string): Promise<void>
}

const AppointmentContext = createContext<AppointmentContextData>({} as AppointmentContextData);

export const AppointmentsProvider: React.FC = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchServicesResults, setSearchServicesResults] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);

  async function fetchAppointments(): Promise<void> {
    const response = await api.getAll();

    setAppointments(response);
  }

  async function fetchNextAppointment(): Promise<void> {
    const response = await api.getNextAppointment();

    const isValid = Object.keys(response).length;

    setNextAppointment(isValid ? response : null);
  }

  async function fetchAll(): Promise<[void, void]> {
    return Promise.all([
      fetchNextAppointment(),
      fetchAppointments(),
    ]);
  }

  async function searchServices(searchTerms: string): Promise<void> {
    if (searchTerms.length) {
      const response = await api.getServicesByName(searchTerms);

      setSearchServicesResults(response);
    }
  }

  async function cancelAppointment(idAppointment: string): Promise<void> {
    await api.cancel(idAppointment);

    fetchAll();
  }

  function clearSearchServices(): void {
    setSearchServicesResults([]);
  }

  return (
    <AppointmentContext.Provider value={{
      appointments,
      nextAppointment,
      searchServices,
      clearSearchServices,
      searchServicesResults,
      fetchAppointments,
      fetchNextAppointment,
      fetchAll,
      cancelAppointment,
    }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = (): AppointmentContextData => {
  const context = useContext(AppointmentContext);

  return context;
};
