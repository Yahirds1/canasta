import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type Offer = {
  id: string;
  product: string;
  category: string;
  store: string;
  neighborhood: string;
  originalPrice: number;
  price: number;
  quantity: number;
  kg: number;
  pickup: string;
  bestBefore: string;
  emoji: string;
};

const INITIAL_OFFERS: Offer[] = [
  { id: 'bread', product: 'Paquete de pan dulce', category: 'Panadería', store: 'Panadería Buen Día', neighborhood: 'Centro', originalPrice: 52, price: 26, quantity: 5, kg: 0.8, pickup: 'Hoy · 6 a 8 pm', bestBefore: 'Consumo hoy', emoji: '🥐' },
  { id: 'fruit', product: 'Caja de fruta madura', category: 'Frutas y verduras', store: 'Frutería Lupita', neighborhood: 'San Benito', originalPrice: 90, price: 35, quantity: 4, kg: 3, pickup: 'Hoy · 4 a 7 pm', bestBefore: 'Consumo hoy', emoji: '🍊' },
  { id: 'sandwich', product: 'Sándwich del día', category: 'Comida preparada', store: 'Café Nube', neighborhood: 'Centro', originalPrice: 68, price: 34, quantity: 3, kg: 0.45, pickup: 'Hoy · 5 a 6 pm', bestBefore: 'Preparado hoy', emoji: '🥪' },
  { id: 'vegetables', product: 'Canasta de verduras', category: 'Frutas y verduras', store: 'Mercado La Huerta', neighborhood: 'Las Quintas', originalPrice: 75, price: 30, quantity: 6, kg: 2, pickup: 'Hoy · 5 a 8 pm', bestBefore: 'Consumo hoy', emoji: '🥬' },
  { id: 'yogurt', product: 'Yogur natural (4 piezas)', category: 'Lácteos', store: 'Abarrotes Sol', neighborhood: 'Modelo', originalPrice: 64, price: 32, quantity: 3, kg: 0.6, pickup: 'Hoy · 3 a 6 pm', bestBefore: 'Revisar fecha en tienda', emoji: '🥛' },
];

type MarketplaceContextValue = {
  offers: Offer[];
  reservations: number;
  rescuedKg: number;
  reserveOffer: (id: string) => boolean;
  publishOffer: (offer: Omit<Offer, 'id'>) => void;
};
const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

export function WatchProvider({ children }: PropsWithChildren) {
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [reservations, setReservations] = useState(0);
  const [rescuedKg, setRescuedKg] = useState(0);
  const value = useMemo(() => ({
    offers,
    reservations,
    rescuedKg,
    reserveOffer: (id: string) => {
      const offer = offers.find((item) => item.id === id);
      if (!offer || offer.quantity < 1) return false;
      setOffers((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      setReservations((count) => count + 1);
      setRescuedKg((kg) => kg + offer.kg);
      return true;
    },
    publishOffer: (offer: Omit<Offer, 'id'>) => {
      setOffers((current) => [{ ...offer, id: `offer-${Date.now()}` }, ...current]);
    },
  }), [offers, reservations, rescuedKg]);
  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useWatchAlerts() {
  const value = useContext(MarketplaceContext);
  if (!value) throw new Error('useWatchAlerts must be used inside WatchProvider');
  return value;
}
