import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { api } from '../../../lib/api';
import { MapInterface } from '../../../lib/types';

/**
 * Send a request to delete a map
 * @param map - The map to delete
 * @returns The deleted map
 */
async function deleteMap(map: MapInterface) {
  const { data } = await api.delete<MapInterface>(`/api/maps/${map.id}`, { data: { campaignId: map.campaignId } });
  return data;
}

/**
 * Delete a map
 * @returns Map delete mutation
 */
export function useDeleteMap() {
  const queryClient = useQueryClient();

  return useMutation(deleteMap, {
    // Optimistic update
    onMutate: async (map) => {
      await queryClient.cancelQueries([`campaigns/${map.campaignId}/maps`]);
      const previousMaps = queryClient.getQueryData<MapInterface[]>([`campaigns/${map.campaignId}/maps`]);
      queryClient.setQueryData([`campaigns/${map.campaignId}/maps`], (old: MapInterface[] = []) =>
        old.filter((m) => m.id !== map.id),
      );
      return { previousMaps };
    },
    // Rollback
    onError: (err, map, context) => {
      queryClient.setQueryData([`campaigns/${map.campaignId}/maps`], context?.previousMaps);
    },
    // Refetch
    onSettled: (map, err: Error | null) => {
      if (err) {
        toast.error(err.message);
      }
      queryClient.invalidateQueries([`campaigns/${map?.campaignId}/maps`]);
    },
  });
}
