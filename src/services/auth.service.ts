import { AxiosResponse } from 'axios';
import cookies from 'js-cookie';
import { EXPIRES_Type, service, TAuth, TAuthLogin } from '../../types/common';
import BaseService from './base.service';

class AuthService extends BaseService {
  private EXPIRES: EXPIRES_Type;
  private readonly service: service = 'auth';

  constructor() {
    super();
    this.EXPIRES = { ACCESS: 1, REFRESH: 7 };
  }

  private setCookies({ data }: AxiosResponse<any>) {
    cookies.set('accessToken', data.access, { expires: this.EXPIRES.ACCESS });
    cookies.set('refreshToken', data.refresh, { expires: this.EXPIRES.REFRESH });
  }

  handleCookies(data: AxiosResponse<any>) {
    this.setCookies;
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async postAuthRefresh() {
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
      return;
    }

    const { data } = await this.requestPost({
      endPoint: `${this.service}/refresh/`,
      payload: null,
      config: {
        headers: this.getCommonHeader(refreshToken),
      },
    });

    this.setCookies(data);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async postAuthSignup(payload: TAuth) {
    const { data } = await this.requestPost({
      endPoint: `${this.service}/` + 'signup',
      payload,
    });

    this.setCookies(data);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async postAuthLogin(payload: TAuthLogin) {
    const { data } = await this.requestPost({
      endPoint: `${this.service}/` + 'login',
      payload,
    });

    this.setCookies(data);
  }
}

export default new AuthService();
