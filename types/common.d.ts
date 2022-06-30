export type service = 'users' | 'auth';

export type TAuth = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  agreements: boolean;
};

export type TAuthLogin = {
  email: Pick<TAuth, 'email'>;
  password: Pick<TAuth, 'password'>;
};

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

type EXPIRES_Type = {
  ACCESS: number;
  REFRESH: number;
};
