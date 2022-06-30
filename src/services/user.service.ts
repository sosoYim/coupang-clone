import cookies from 'js-cookie';
import { service } from '../../types/common';
import BaseService from './base.service';
class UserService extends BaseService {
  private readonly service: service = 'users';

  async me() {
    const accessToken = cookies.get('accessToken');
    if (!accessToken) {
      return;
    }

    const { data } = await this.requestGet({
      endPoint: `${this.service}/me`,
      config: {
        headers: this.getCommonHeader(accessToken),
      },
    });

    return data;
  }

  async read(id: number) {
    const { data } = await this.requestGet({ endPoint: `${this.service}/${id}` });

    return data;
  }
}

export default new UserService();
