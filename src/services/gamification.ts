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
  .get('/v1/coupons/availables', {
    baseURL,
  }).then(({ data }) => data);

export const rescueCoupon = async (idCoupon: string): Promise<any> => instance
  .post('/v1/coupons/rescue', { idCoupon }, {
    baseURL,
  }).then(({ data }) => data);

export const getRescuedCoupons = async (): Promise<any> => instance
  .get('/v1/coupons/rescued', {
    baseURL,
  }).then(({ data }) => data);
