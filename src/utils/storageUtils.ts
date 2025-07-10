
export const getStorageItem = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    localStorage.removeItem(key);
    return defaultValue;
  }
};

export const setStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage "${key}":`, error);
    return false;
  }
};

export const removeStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage "${key}":`, error);
    return false;
  }
};
