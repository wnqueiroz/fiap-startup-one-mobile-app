import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/appointments';

interface AppointmentContextData {
    appointments: any[]
    nextAppointment: any
    searchServicesResults: any
    searchServicesTerms: any
    fetchAppointments(): Promise<void>
    fetchNextAppointment(): Promise<void>
    searchServices(): Promise<void>
    clearSearchServices(): void
    fetchAll(): Promise<[void, void]>
    cancelAppointment(idAppointment: string): Promise<void>
    createAppointment(payload: { idService: string; idServicePeriod: string; date: string; }): Promise<void>
    setTermsToSearchServices(searchTerms: string): void
    finishAppointment(idAppointment: string): Promise<void>
}

const AppointmentContext = createContext<AppointmentContextData>({} as AppointmentContextData);

export const AppointmentsProvider: React.FC = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchServicesResults, setSearchServicesResults] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [searchServicesTerms, setSearchServicesTerms] = useState('');

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

  async function searchServices(): Promise<void> {
    if (searchServicesTerms.length) {
      const response = await api.getServicesByName(searchServicesTerms);

      setSearchServicesResults(response);
    }
  }

  async function cancelAppointment(idAppointment: string): Promise<void> {
    await api.cancel(idAppointment);

    fetchAll();
  }

  async function finishAppointment(idAppointment: string): Promise<void> {
    await api.finish(idAppointment);

    fetchAll();
  }

  async function createAppointment(payload: { idService: string; idServicePeriod: string; date: string; }): Promise<void> {
    await api.create({
      idService: payload.idService,
      idServicePeriod: payload.idServicePeriod,
      date: payload.date,
    });

    fetchAll();
  }

  function clearSearchServices(): void {
    setSearchServicesResults([]);
    setTermsToSearchServices('');
  }

  function setTermsToSearchServices(searchTerms: string): void {
    setSearchServicesTerms(searchTerms);
  }

  return (
    <AppointmentContext.Provider value={{
      appointments,
      nextAppointment,
      searchServices,
      clearSearchServices,
      searchServicesTerms,
      searchServicesResults,
      fetchAppointments,
      fetchNextAppointment,
      fetchAll,
      cancelAppointment,
      createAppointment,
      setTermsToSearchServices,
      finishAppointment,
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
