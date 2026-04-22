import { apiUrl } from './apiBase';
import { clearAuthSession, getAccessToken } from './authStorage';

const readErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    return payload?.message || 'Không thể tải dữ liệu quản trị.';
  } catch (_error) {
    return 'Không thể tải dữ liệu quản trị.';
  }
};

export const fetchAdminResource = async (resource, { signal } = {}) => {
  const token = getAccessToken();
  const response = await fetch(apiUrl(`/api/admin/${resource}`), {
    signal,
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthSession();
    }

    throw new Error(await readErrorMessage(response));
  }

  return response.json();
};
