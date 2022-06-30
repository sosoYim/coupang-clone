import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type RequestType<T> = {
  endPoint: string;
  config?: AxiosRequestConfig<T>;
};

type RequestWithPayloadType<T> = RequestType<T> & {
  payload: Partial<T> | null;
};

abstract class BaseService {
  private readonly API_HOST = process.env.NEXT_PUBLIC_API_HOST;

  async requestGet<T>({ endPoint, config }: RequestType<T>) {
    const { data } = await axios.get(`${this.API_HOST}/${endPoint}`, config);
    return data;
  }

  async requestPost<T>({ endPoint, config, payload }: RequestWithPayloadType<T>) {
    const { data } = await axios.post(`${this.API_HOST}/${endPoint}`, payload, config);
    return data;
  }

  // .. put, patch, delete 등 추가 가능

  getCommonHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
  }

  handleError(error: AxiosError) {
    console.error(error);
    throw new Error();
  }
}

export default BaseService;
