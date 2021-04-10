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
