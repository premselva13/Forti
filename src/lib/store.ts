import { useEffect, useState } from "react";

/** Tiny localStorage-backed state hook (learn-track progress, sizer hand-off). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — degrade silently */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export const SIZER_HANDOFF_KEY = "fx.sizer.handoff";

export interface SizerHandoff {
  sites: number;
  mbpsPerSite: number;
  ha: boolean;
  saseSeats: number;
  hubs: number;
  branchModel: string;
  hubModel: string;
  license: string;
  createdAt: string;
}

export function saveSizerHandoff(h: SizerHandoff) {
  try {
    localStorage.setItem(SIZER_HANDOFF_KEY, JSON.stringify(h));
  } catch {
    /* ignore */
  }
}

export function loadSizerHandoff(): SizerHandoff | null {
  try {
    const raw = localStorage.getItem(SIZER_HANDOFF_KEY);
    return raw ? (JSON.parse(raw) as SizerHandoff) : null;
  } catch {
    return null;
  }
}
