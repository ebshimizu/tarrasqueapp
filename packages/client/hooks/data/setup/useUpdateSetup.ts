import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../lib/api';
import { SetupInterface } from '../../../lib/types';

/**
 * Send a request to update setup
 * @param setup - The setup to update with
 * @returns The updated setup
 */
async function updateSetup(setup: Partial<SetupInterface>) {
  const { data } = await api.put<SetupInterface>(`/api/setup`, setup);
  return data;
}

/**
 * Update setup
 * @returns Setup update mutation
 */
export function useUpdateSetup() {
  const queryClient = useQueryClient();

  return useMutation(updateSetup, {
    onSuccess: () => {
      queryClient.invalidateQueries([`setup`]);
    },
  });
}
