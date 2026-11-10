import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type WatchContextValue = { saved: string[]; toggleSaved: (name: string) => void };
const WatchContext = createContext<WatchContextValue | null>(null);

export function WatchProvider({ children }: PropsWithChildren) {
  const [saved, setSaved] = useState<string[]>([]);
  const value = useMemo(() => ({
    saved,
    toggleSaved: (name: string) => setSaved((old) => old.includes(name) ? old.filter((item) => item !== name) : [...old, name]),
  }), [saved]);
  return <WatchContext.Provider value={value}>{children}</WatchContext.Provider>;
}

export function useWatchAlerts() {
  const value = useContext(WatchContext);
  if (!value) throw new Error('useWatchAlerts must be used inside WatchProvider');
  return value;
}
