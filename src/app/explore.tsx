import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchAlerts } from '@/lib/watch-state';

export default function WatchScreen() {
  const { offers, reservations, rescuedKg } = useWatchAlerts();
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const nextDeal = [...offers].filter((item) => item.quantity > 0).sort((a, b) => b.originalPrice / b.price - a.originalPrice / a.price)[0] ?? offers[0];
  const discount = Math.round((1 - nextDeal.price / nextDeal.originalPrice) * 100);
  const time = clock.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.kicker}>RESCATE LOCAL · RELOJ</Text><Text style={styles.heading}>Ofertas del día<Text style={styles.green}> a tiempo</Text></Text><Text style={styles.description}>Una alerta breve para encontrar excedentes cercanos antes de que termine el horario de recogida.</Text>
    <View style={styles.watchOuter}><View style={styles.watchButton} /><View style={styles.watchFace}>
      <View style={styles.status}><View style={styles.liveDot} /><Text style={styles.statusText}>RESCATE LOCAL</Text><Text style={styles.battery}>▰</Text></View><Text style={styles.time}>{time}</Text><Text style={styles.date}>{clock.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()}</Text><View style={styles.divider} />
      <Text style={styles.dealKicker}>OFERTA CERCA DE TI</Text><Text style={styles.emoji}>{nextDeal.emoji}</Text><Text style={styles.product}>{nextDeal.product}</Text><Text style={styles.price}>${nextDeal.price.toFixed(0)}</Text><Text style={styles.store}>{nextDeal.store} · {nextDeal.neighborhood}</Text><View style={styles.discount}><Text style={styles.discountText}>−{discount}% · {nextDeal.quantity} disponibles</Text></View><Text style={styles.pickup}>Recoge {nextDeal.pickup}</Text>
    </View></View>
    <View style={styles.impact}><Text style={styles.impactTitle}>IMPACTO DE LA COMUNIDAD</Text><View style={styles.impactRow}><View><Text style={styles.impactNumber}>{reservations}</Text><Text style={styles.impactLabel}>apartados</Text></View><View><Text style={styles.impactNumber}>{rescuedKg.toFixed(1)} kg</Text><Text style={styles.impactLabel}>alimentos apartados</Text></View><View><Text style={styles.impactNumber}>{offers.length}</Text><Text style={styles.impactLabel}>ofertas activas</Text></View></View></View>
    <View style={styles.note}><Text style={styles.noteIcon}>i</Text><Text style={styles.noteText}>Simulación de smartwatch integrada. Las publicaciones y apartados se comparten entre las pestañas durante esta sesión; no hay notificaciones a un reloj físico ni base de datos todavía.</Text></View>
    <Text style={styles.footer}>Las ofertas de ejemplo son ficticias. Confirma disponibilidad, ingredientes y horario directamente con el comercio antes de recoger.</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F3EC' }, page: { padding: 20, paddingBottom: 35, alignItems: 'center', maxWidth: 640, width: '100%', alignSelf: 'center' }, kicker: { marginTop: 6, color: '#728075', fontSize: 9, fontWeight: '900', letterSpacing: 1.6 }, heading: { color: '#1D3024', fontSize: 23, fontWeight: '900', marginTop: 5, textAlign: 'center' }, green: { color: '#4B9B67' }, description: { color: '#788178', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 5, marginBottom: 18 },
  watchOuter: { width: 270, height: 390, borderRadius: 56, backgroundColor: '#C9CCC6', padding: 13, shadowColor: '#17241B', shadowOpacity: 0.18, shadowRadius: 13, shadowOffset: { width: 0, height: 8 }, elevation: 7 }, watchButton: { position: 'absolute', right: -4, top: 94, height: 46, width: 8, borderRadius: 5, backgroundColor: '#8B9089' }, watchFace: { flex: 1, borderRadius: 45, backgroundColor: '#101914', alignItems: 'center', paddingHorizontal: 16, paddingTop: 21, overflow: 'hidden' }, status: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }, liveDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: '#A6D383' }, statusText: { flex: 1, color: '#B3C8B8', fontWeight: '900', letterSpacing: 1, fontSize: 8 }, battery: { color: '#B7C8B8', fontSize: 10 }, time: { color: '#FFFDF4', fontWeight: '700', fontSize: 37, letterSpacing: 1, marginTop: 6 }, date: { color: '#9AACA0', fontWeight: '700', fontSize: 9, letterSpacing: 1 }, divider: { width: '100%', height: 1, backgroundColor: '#34443A', marginVertical: 12 }, dealKicker: { color: '#B8DA93', fontWeight: '900', fontSize: 8, letterSpacing: 1.1 }, emoji: { fontSize: 24, marginTop: 5 }, product: { color: '#F8FAF5', fontSize: 14, fontWeight: '900', marginTop: 4, textAlign: 'center' }, price: { color: '#B8DA93', fontSize: 28, fontWeight: '900', marginTop: 1 }, store: { color: '#CFD9D0', fontSize: 9, textAlign: 'center' }, discount: { borderRadius: 14, backgroundColor: '#263A2D', paddingVertical: 6, paddingHorizontal: 10, marginTop: 8 }, discountText: { color: '#C9E3AB', fontWeight: '800', fontSize: 9 }, pickup: { color: '#B9C6BB', fontSize: 8, marginTop: 7 },
  impact: { width: '100%', backgroundColor: '#FFF', borderRadius: 15, padding: 14, marginTop: 17, borderWidth: 1, borderColor: '#E7E9E1' }, impactTitle: { color: '#718074', fontSize: 8, fontWeight: '900', letterSpacing: 1 }, impactRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }, impactNumber: { color: '#2D704B', fontSize: 17, fontWeight: '900' }, impactLabel: { color: '#7B847C', fontSize: 8, marginTop: 2 }, note: { width: '100%', flexDirection: 'row', gap: 9, marginTop: 12, backgroundColor: '#E7EEE3', borderRadius: 13, padding: 12 }, noteIcon: { overflow: 'hidden', textAlign: 'center', height: 18, width: 18, borderRadius: 10, backgroundColor: '#D2E3D0', color: '#33724F', fontWeight: '900' }, noteText: { flex: 1, color: '#526257', fontSize: 9, lineHeight: 14 }, footer: { color: '#838A83', fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 11 },
});
