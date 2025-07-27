import { useState, useEffect } from "react";

import { menuService } from "@/lib/api/menus";

export const useMenu = (id?: string | number) => {
  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    menuService
      .getMenuById(id)
      .then((data) => {
        setMenu(data?.data || data || null);
      })
      .catch(() => {
        setError("Failed to fetch menu details. Please try again later.");
        setMenu(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { menu, loading, error };
};
