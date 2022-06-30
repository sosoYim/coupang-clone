export type service = 'users' | 'auth';

export type TAuthPayload = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  agreements: boolean;
};
