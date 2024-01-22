import { useState } from 'react';

export const useReloadKey = () => {
  const [reloadKey, setReloadKey] = useState(1);
  const handleReload = () => {
    setReloadKey(prevKey => prevKey + 1);
  };
  return { reloadKey, handleReload };
};
