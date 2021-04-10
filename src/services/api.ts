import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3130',
});

type signInParams = {
  email: string,
  password: string,
}

type signUpParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export const signIn = ({
  email,
  password,
}: signInParams): Promise<any> => instance.post('/v1/users/signin', {
  email,
  password,
}).then(({ data }) => data);

export const signUp = ({
  name,
  email,
  password,
  passwordConfirmation,
}: signUpParams): Promise<any> => instance.post('/v1/users/signup', {
  name,
  email,
  password,
  passwordConfirmation,
}).then(({ data }) => data);
