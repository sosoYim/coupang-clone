import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { UsersService } from '../../services';

export const useGetUserMe = () =>
  useQuery(['getMe'], () => UsersService.getUsersMe, {
    refetchInterval: 500,
  });

export const useGetUserRead = (id: number) =>
  useQuery<Response, AxiosError>(['getRead', id], () => UsersService.getUsersRead(id), {
    onError: UsersService.handleError,
  });
