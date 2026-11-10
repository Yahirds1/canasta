import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type StorePrice = { name: string; price: number; color: string };
export type Product = { name: string; unit: string; category: string; stores: StorePrice[] };

const INITIAL_PRODUCTS: Product[] = [
  { name: 'Leche entera', unit: '1 litro', category: 'Lácteos', stores: [{ name: 'Abarrotes Sol', price: 27.5, color: '#E8A94B' }, { name: 'Mercado Central', price: 29, color: '#488A69' }, { name: 'Súper Norte', price: 31.9, color: '#5873A4' }] },
  { name: 'Arroz', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Mercado Central', price: 28, color: '#488A69' }, { name: 'Abarrotes Sol', price: 31.5, color: '#E8A94B' }, { name: 'Súper Norte', price: 34, color: '#5873A4' }] },
  { name: 'Huevo', unit: 'docena', category: 'Despensa', stores: [{ name: 'Súper Norte', price: 42, color: '#5873A4' }, { name: 'Mercado Central', price: 44.5, color: '#488A69' }, { name: 'Abarrotes Sol', price: 48, color: '#E8A94B' }] },
  { name: 'Tortillas', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Abarrotes Sol', price: 26, color: '#E8A94B' }, { name: 'Súper Norte', price: 27, color: '#5873A4' }, { name: 'Mercado Central', price: 29, color: '#488A69' }] },
  { name: 'Frijol', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Mercado Central', price: 36, color: '#488A69' }, { name: 'Abarrotes Sol', price: 39, color: '#E8A94B' }, { name: 'Súper Norte', price: 42, color: '#5873A4' }] },
];

type WatchContextValue = {
  saved: string[];
  products: Product[];
  reports: number;
  toggleSaved: (name: string) => void;
  reportPrice: (productName: string, storeName: string, price: number) => void;
};
const WatchContext = createContext<WatchContextValue | null>(null);

export function WatchProvider({ children }: PropsWithChildren) {
  const [saved, setSaved] = useState<string[]>([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reports, setReports] = useState(0);
  const value = useMemo(() => ({
    saved,
    products,
    reports,
    toggleSaved: (name: string) => setSaved((old) => old.includes(name) ? old.filter((item) => item !== name) : [...old, name]),
    reportPrice: (productName: string, storeName: string, price: number) => {
      setProducts((current) => current.map((product) => {
        if (product.name !== productName) return product;
        const existing = product.stores.find((store) => store.name.toLowerCase() === storeName.toLowerCase());
        const stores = existing
          ? product.stores.map((store) => store === existing ? { ...store, price } : store)
          : [...product.stores, { name: storeName, price, color: '#8A6FB1' }];
        return { ...product, stores: stores.sort((a, b) => a.price - b.price) };
      }));
      setReports((count) => count + 1);
    },
  }), [saved, products, reports]);
  return <WatchContext.Provider value={value}>{children}</WatchContext.Provider>;
}

export function useWatchAlerts() {
  const value = useContext(WatchContext);
  if (!value) throw new Error('useWatchAlerts must be used inside WatchProvider');
  return value;
}
