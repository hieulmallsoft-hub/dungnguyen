import { useEffect, useState } from 'react';
import { fetchAdminResource } from '../data/adminApi';

function useAdminResource(resource, initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError('');

    fetchAdminResource(resource, { signal: controller.signal })
      .then((payload) => {
        if (active) {
          setData(payload);
        }
      })
      .catch((fetchError) => {
        if (active && fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Không thể tải dữ liệu quản trị.');
        }
      })
      .finally(() => {
        if (active && !controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [resource, reloadKey]);

  return {
    data,
    error,
    loading,
    reload: () => setReloadKey((value) => value + 1)
  };
}

export default useAdminResource;
