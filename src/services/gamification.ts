import { instance } from './api';

const baseURL = 'http://localhost:3133';

export const getMe = async (): Promise<any> => instance
  .get('/v1/users/me', {
    baseURL,
  }).then(({ data }) => data);

export const getRanking = async (): Promise<any> => instance
  .get('/v1/ranking', {
    baseURL,
  }).then(({ data }) => data);

export const getCoupons = async (): Promise<any> => instance
  .get('/v1/coupons', {
    baseURL,
  }).then(({ data }) => data);
