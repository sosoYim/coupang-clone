import axios from 'axios';
import cookies from 'js-cookie';
import RootService from './root.service';
class UserService extends RootService {
  constructor(endPoint: string) {
    super(endPoint);
  }

  async me() {
    const accessToken = cookies.get('accessToken');
    if (!accessToken) {
      return;
    }

    const { data } = await axios.get(this.BASE_URL + 'me', {
      headers: this.getCommonHeader(accessToken),
    });

    return data;
  }

  async read(id: number) {
    const { data } = await axios.get(this.BASE_URL + id);

    return data;
  }
}

export default new UserService('/users/');
