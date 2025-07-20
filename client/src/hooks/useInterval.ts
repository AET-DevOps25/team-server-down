"use client";

import { useEffect } from "react";

export default function useInterval(
  callback: () => void,
  delay: number,
  isEnabled?: boolean,
) {
  useEffect(() => {
    if (!isEnabled) return;
    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId);
  }, [callback, isEnabled, delay]);
}
