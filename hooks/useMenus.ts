import { useState, useEffect } from 'react';
import apiClient from '@/src/lib/axios';
import { useMarket } from '@/lib/market-context';

export interface Menu {
  id: number;
  name: string;
  description?: string;
  price_per_person: number;
  menu_type: string;
  status: string;
  chef: {
    id: number;
    first_name: string;
    last_name: string;
    city?: string;
    country?: string;
    average_rating?: number;
  };
  menu_images?: Array<{
    id: number;
    image: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface MenusResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Menu[];
}

export function useMenus(limit: number = 8, useMarketFilter: boolean = true) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { market } = useMarket();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          page: '1',
          page_size: limit.toString(),
          status: 'Active',
        });
        
        // Add market filter only if explicitly requested
        if (useMarketFilter && market) {
          params.append('market', market);
        }

        const response = await apiClient.get(`/menus/?${params.toString()}`);
        
        if (response.data?.status && response.data?.data?.results) {
          setMenus(response.data.data.results);
        } else {
          setError('Invalid response format');
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch menus');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [limit, market, useMarketFilter]);

  return { menus, loading, error };
}
