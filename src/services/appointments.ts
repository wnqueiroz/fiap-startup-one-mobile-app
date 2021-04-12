import { instance } from './api';

const baseURL = 'http://localhost:3132';

export const getAll = async (): Promise<any> => instance.get('/v1/appointments', {
  baseURL,
}).then(({ data }) => data);

export const getServicesByName = async (
  name: string,
): Promise<any> => instance.get(`/v1/services?name=${name}`, {
  baseURL,
}).then(({ data }) => data);

export const create = async (payload: {
  idService: string;
  idServicePeriod: string;
  date: string;
}): Promise<any> => instance.post('/v1/appointments', payload, {
  baseURL,
}).then(({ data }) => data);

export const getNextAppointment = async (): Promise<any> => instance.get('/v1/appointments/next', {
  baseURL,
}).then(({ data }) => data);
