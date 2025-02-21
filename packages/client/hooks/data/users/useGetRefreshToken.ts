import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { api } from '../../../lib/api';
import { config } from '../../../lib/config';
import { UserInterface } from '../../../lib/types';
import { DateTimeUtils } from '../../../utils/DateTimeUtils';

/**
 * Send a request to get the updated refresh token
 * @param config - Axios request config
 * @returns The user data
 */
export async function checkRefreshToken(config?: AxiosRequestConfig) {
  const { data } = await api.get<UserInterface>(`/api/auth/check-refresh-token`, config);
  return data;
}

/**
 * Send a request to get the updated refresh token
 * @returns The user data
 */
async function getRefreshToken() {
  const { data } = await api.get<UserInterface>(`/api/auth/refresh`);
  return data;
}

/**
 * Get the updated refresh token
 * @returns Refresh token query
 */
export function useGetRefreshToken() {
  const queryClient = useQueryClient();

  const refetchEnabled = Boolean(queryClient.getQueryData([`auth`]));
  // Get a new refresh token if the user is signed in
  const expirationTime = DateTimeUtils.toMillisecondsFromString(config.JWT_ACCESS_TOKEN_EXPIRATION_TIME);
  const refetchInterval = expirationTime / 2;

  return useQuery<UserInterface, AxiosResponse>([`auth/refresh`], () => getRefreshToken(), {
    refetchInterval: refetchEnabled ? refetchInterval : false,
    refetchIntervalInBackground: refetchEnabled,
    onSuccess: (data) => {
      queryClient.setQueryData([`auth`], data);
    },
    onError: () => {
      queryClient.setQueryData([`auth`], null);
    },
  });
}
