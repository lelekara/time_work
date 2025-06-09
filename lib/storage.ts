// Utilitaires pour le localStorage côté client
export function setItem<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
}

export function removeItem(key: string) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
}
