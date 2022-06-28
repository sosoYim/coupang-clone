import axios, { AxiosResponse } from 'axios';
import cookies from 'js-cookie';
import RootService from './root.service';

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

class AuthService extends RootService {
  private EXPIRES: EXPIRES_Type;

  constructor(endPoint: string) {
    super(endPoint);
    this.EXPIRES = { ACCESS: 1, REFRESH: 7 };
  }

  private setCookies({ data }: AxiosResponse<any>) {
    cookies.set('accessToken', data.access, { expires: this.EXPIRES.ACCESS });
    cookies.set('refreshToken', data.refresh, { expires: this.EXPIRES.REFRESH });
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
      return;
    }

    const { data } = await axios.get(this.BASE_URL + 'refresh', {
      headers: this.getCommonHeader(refreshToken),
    });

    this.setCookies(data);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const { data } = await axios.post(this.BASE_URL + 'signup', {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    this.setCookies(data);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await axios.post(this.BASE_URL + 'login', {
      email,
      password,
    });

    this.setCookies(data);
  }
}

export default new AuthService('/auth/');
