const AUTH_STORAGE_KEY = 'SHGINVESTMENT_auth';

export function getAuthSession() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const session = JSON.parse(rawValue);
    if (!session?.accessToken || !session?.user) {
      return null;
    }

    return session;
  } catch (_error) {
    return null;
  }
}

export function setAuthSession(session) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAccessToken() {
  return getAuthSession()?.accessToken || '';
}

export function isAdminSession(session = getAuthSession()) {
  return Boolean(session?.accessToken && session?.user?.role === 'ADMIN');
}
