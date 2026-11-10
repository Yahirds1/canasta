import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchAlerts } from '@/lib/watch-state';

export default function WatchScreen() {
  const { saved, products } = useWatchAlerts();
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const activeProduct = products.find((product) => product.name === saved[0]) ?? products[0];
  const active = activeProduct.name;
  const bestStore = [...activeProduct.stores].sort((a, b) => a.price - b.price)[0];
  const offer = { price: `$${bestStore.price.toFixed(2)}`, store: bestStore.name, hint: saved.length ? 'Mejor precio reportado' : 'Menor precio en la comunidad' };
  const time = clock.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.kicker}>RELOJ DE DEMOSTRACIÓN</Text>
        <Text style={styles.heading}>CanastaLista<Text style={styles.green}> en tu muñeca</Text></Text>
        <Text style={styles.description}>El reloj resume el mejor precio reportado para consultar al momento de comprar.</Text>
        <View style={styles.watchOuter}>
          <View style={styles.watchButton} />
          <View style={styles.watchFace}>
            <View style={styles.watchStatus}><View style={styles.liveDot} /><Text style={styles.watchStatusText}>CANASTALISTA</Text><Text style={styles.battery}>▰</Text></View>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.date}>{clock.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()}</Text>
            <View style={styles.divider} />
            <View style={styles.alertLabelRow}><Text style={styles.bell}>◉</Text><Text style={styles.alertLabel}>AVISO DE PRECIO</Text></View>
            <Text style={styles.product}>{active}</Text>
            <Text style={styles.price}>{offer.price}</Text>
            <Text style={styles.store}>{offer.store}</Text>
            <View style={styles.savings}><Text style={styles.savingsText}>↓  {offer.hint}</Text></View>
            <Pressable style={styles.dismiss}><Text style={styles.dismissText}>ENTENDIDO</Text></Pressable>
          </View>
        </View>
        <View style={styles.note}><Text style={styles.noteIcon}>i</Text><Text style={styles.noteText}>Los datos son de demostración. Un precio que reportes en Canasta se refleja aquí en la misma sesión; todavía no se envían notificaciones reales a un reloj físico.</Text></View>
        <View style={styles.syncCard}><Text style={styles.syncTitle}>ALERTA SELECCIONADA EN EL TELÉFONO</Text><Text style={styles.syncProduct}>{saved.length ? active : 'Arroz (aviso de muestra)'}</Text><Text style={styles.syncHint}>{saved.length ? `Hay ${saved.length} producto${saved.length === 1 ? '' : 's'} con alerta activa` : 'Activa un aviso desde la pestaña Canasta para mostrarlo aquí.'}</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F4EE' }, page: { padding: 20, paddingBottom: 38, alignItems: 'center', maxWidth: 640, width: '100%', alignSelf: 'center' },
  kicker: { marginTop: 7, color: '#728075', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 }, heading: { fontSize: 23, fontWeight: '800', color: '#1B2C21', marginTop: 6, textAlign: 'center' }, green: { color: '#328264' }, description: { color: '#778078', fontSize: 13, textAlign: 'center', marginTop: 5, marginBottom: 21 },
  watchOuter: { width: 270, height: 360, borderRadius: 56, backgroundColor: '#C9CCC6', padding: 13, shadowColor: '#17241B', shadowOpacity: 0.18, shadowRadius: 13, shadowOffset: { width: 0, height: 8 }, elevation: 7 }, watchButton: { position: 'absolute', right: -4, top: 94, height: 46, width: 8, borderRadius: 5, backgroundColor: '#8B9089' }, watchFace: { flex: 1, borderRadius: 45, backgroundColor: '#101914', alignItems: 'center', paddingHorizontal: 16, paddingTop: 21, overflow: 'hidden' }, watchStatus: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }, liveDot: { width: 5, height: 5, borderRadius: 4, backgroundColor: '#A6D383' }, watchStatusText: { flex: 1, color: '#B3C8B8', fontWeight: '800', letterSpacing: 1, fontSize: 8 }, battery: { color: '#B7C8B8', fontSize: 10 }, time: { color: '#FFFDF4', fontWeight: '700', fontSize: 39, letterSpacing: 1, marginTop: 6 }, date: { color: '#9AACA0', fontWeight: '700', fontSize: 9, letterSpacing: 1 }, divider: { width: '100%', height: 1, backgroundColor: '#34443A', marginVertical: 13 }, alertLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 }, bell: { color: '#B8DA93', fontSize: 12 }, alertLabel: { color: '#B8DA93', fontWeight: '800', letterSpacing: 1.2, fontSize: 8 }, product: { color: '#F8FAF5', fontSize: 18, fontWeight: '800', marginTop: 7 }, price: { color: '#B8DA93', fontSize: 28, fontWeight: '800', marginTop: 0 }, store: { color: '#CFD9D0', fontSize: 10, marginTop: 0 }, savings: { borderRadius: 14, backgroundColor: '#263A2D', paddingVertical: 6, paddingHorizontal: 10, marginTop: 7 }, savingsText: { color: '#C9E3AB', fontWeight: '700', fontSize: 9 }, dismiss: { backgroundColor: '#F3F5EF', width: '100%', paddingVertical: 8, alignItems: 'center', borderRadius: 18, marginTop: 12 }, dismissText: { color: '#25362B', fontWeight: '800', letterSpacing: 1, fontSize: 9 },
  note: { width: '100%', flexDirection: 'row', gap: 9, marginTop: 19, backgroundColor: '#E9EEE5', borderRadius: 14, padding: 13 }, noteIcon: { overflow: 'hidden', textAlign: 'center', height: 18, width: 18, borderRadius: 10, backgroundColor: '#D2E3D0', color: '#33724F', fontWeight: '800' }, noteText: { flex: 1, color: '#526257', fontSize: 11, lineHeight: 16 }, syncCard: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginTop: 12, borderWidth: 1, borderColor: '#E9EAE4' }, syncTitle: { fontSize: 9, letterSpacing: 1, color: '#7E897F', fontWeight: '800' }, syncProduct: { color: '#24352A', fontWeight: '800', fontSize: 15, marginTop: 7 }, syncHint: { color: '#778078', fontSize: 11, marginTop: 3 },
});
