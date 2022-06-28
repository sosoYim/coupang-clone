type RootServiceType = {
  BASE_URL: string;
};

class RootService {
  BASE_URL: RootServiceType['BASE_URL'];

  constructor(endPoint: string) {
    this.BASE_URL = process.env.NEXT_PUBLIC_API_HOST + endPoint;
  }

  getCommonHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
  }
}

export default RootService;
