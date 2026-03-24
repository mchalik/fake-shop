import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import { useQueryClient } from '@tanstack/react-query';

import { ITEMS_QUERY_KEYS } from '@/entities/product';

export const InvalidateCacheButton = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    ITEMS_QUERY_KEYS.forEach((key) => {
      queryClient.invalidateQueries<string[]>({
        queryKey: [key],
        refetchType: 'active'
      });
    });
  };

  return (
    <IconButton color='inherit' onClick={invalidateQueries}>
      <CachedIcon />
    </IconButton>
  );
};