export type StoredUser = {
    name?: { first?: string; last?: string };
    [key: string]: unknown;
  };
  
  const KEY = "user";
  
  export const saveUser = (user: StoredUser) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(user));
  };
  
  export const readUser = (): StoredUser | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  };
  
  export const clearUser = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
  };