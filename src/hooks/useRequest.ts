import { useQuery } from 'react-query';
import { UserService } from '../services';

export const useRequest = () => {
  return useQuery('me', UserService.me, { refetchInterval: 500 });
};
