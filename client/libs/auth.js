const storageKey = 'sid';

export function setToken(token) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  if (typeof window.localStorage === 'undefined') {
    return undefined;
  }

  return window.localStorage.setItem(storageKey, token);
}

export function getToken() {
  if (typeof window === 'undefined') {
    return undefined;
  }
  if (typeof window.localStorage === 'undefined') {
    return undefined;
  }

  return window.localStorage.getItem(storageKey);
}

export function removeToken() {
  if (typeof window === 'undefined') {
    return undefined;
  }
  if (typeof window.localStorage === 'undefined') {
    return undefined;
  }

  return window.localStorage.removeItem(storageKey);
}
