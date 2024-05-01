import { useEffect } from "react";

export const useKey = (key, action) => {
  useEffect(() => {
    const closeDetailEvent = (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", closeDetailEvent);

    return () => {
      document.removeEventListener("keydown", closeDetailEvent);
    };
  }, [action, key]);
};
