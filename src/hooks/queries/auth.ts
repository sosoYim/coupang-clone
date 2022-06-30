import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TAuth, TAuthLogin } from '../../../types/common';
import { AuthService } from '../../services';

export const usePostAuthSignup = () =>
  useMutation<unknown, AxiosError, TAuth, unknown>(
    (payload: TAuth) => AuthService.postAuthSignup(payload),
    { onError: error => AuthService.handleError(error) }
  );

export const usePostAuthLogin = () =>
  useMutation<unknown, AxiosError, TAuthLogin, unknown>(
    (payload: TAuthLogin) => AuthService.postAuthLogin(payload),
    { onError: error => AuthService.handleError(error) }
  );

export const usePostAuthRefresh = () =>
  useMutation<unknown, AxiosError, void, unknown>(() => AuthService.postAuthRefresh(), {
    onError: error => AuthService.handleError(error),
  });
