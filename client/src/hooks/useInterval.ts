"use client";

import { useEffect } from "react";

export default function useInterval(callback: () => void, delay: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId);
  }, [callback, delay]);
}
