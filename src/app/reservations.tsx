import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchAlerts } from '@/lib/watch-state';

const money = (amount: number) => `$${amount.toFixed(2)}`;

export default function ReservationsScreen() {
  const { reservedOffers, cancelReservation, rescuedKg } = useWatchAlerts();
  const total = reservedOffers.reduce((sum, reservation) => sum + reservation.offer.price, 0);
  const savings = reservedOffers.reduce((sum, reservation) => sum + reservation.offer.originalPrice - reservation.offer.price, 0);

  const confirmCancel = (id: string, name: string) => Alert.alert(
    'Cancelar apartado',
    `¿Quieres cancelar ${name}? La unidad volverá a estar disponible para otras personas.`,
    [
      { text: 'Seguir apartado', style: 'cancel' },
      { text: 'Cancelar apartado', style: 'destructive', onPress: () => cancelReservation(id) },
    ],
  );

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.eyebrow}>RESCATE LOCAL</Text><Text style={styles.title}>Mis apartados</Text><Text style={styles.description}>Tus ofertas reservadas para recoger directamente en cada comercio.</Text>
    {reservedOffers.length > 0 && <View style={styles.summary}><View><Text style={styles.summaryLabel}>TOTAL AL RECOGER</Text><Text style={styles.summaryValue}>{money(total)}</Text></View><View style={styles.summaryDivider} /><View><Text style={styles.summaryLabel}>AHORRO FRENTE AL PRECIO ORIGINAL</Text><Text style={styles.summaryValue}>{money(savings)}</Text></View><View style={styles.summaryDivider} /><View><Text style={styles.summaryLabel}>ALIMENTO APARTADO</Text><Text style={styles.summaryValue}>{rescuedKg.toFixed(1)} kg</Text></View></View>}
    {reservedOffers.length === 0 ? <View style={styles.empty}><View style={styles.emptyIcon}><Text style={styles.bag}>▢</Text></View><Text style={styles.emptyTitle}>Aún no tienes apartados</Text><Text style={styles.emptyText}>Cuando apartes una oferta, aquí verás el producto, el comercio, el horario y el precio para recogerlo.</Text><View style={styles.tip}><Text style={styles.tipText}>Ve a la pestaña Rescate para explorar ofertas del día.</Text></View></View> : reservedOffers.map(({ id, offer }) => <View key={id} style={styles.card}>
      <View style={styles.cardHead}><View style={styles.productIcon}><Text style={styles.emoji}>{offer.emoji}</Text></View><View style={styles.productCopy}><Text style={styles.productName}>{offer.product}</Text><Text style={styles.category}>{offer.category} · 1 unidad</Text></View><Text style={styles.price}>{money(offer.price)}</Text></View>
      <View style={styles.divider} /><View style={styles.detail}><Text style={styles.detailIcon}>⌖</Text><Text style={styles.detailText}>{offer.store} · {offer.neighborhood}</Text></View><View style={styles.detail}><Text style={styles.detailIcon}>◷</Text><Text style={styles.detailText}>Recoge {offer.pickup}</Text></View><View style={styles.detail}><Text style={styles.detailIcon}>✓</Text><Text style={styles.detailText}>{offer.bestBefore}</Text></View>
      <View style={styles.pickupNote}><Text style={styles.pickupNoteText}>Muestra este apartado al comercio. El pago se realiza al recoger.</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Cancelar apartado de ${offer.product}`} onPress={() => confirmCancel(id, offer.product)} style={styles.cancelButton}><Text style={styles.cancelText}>Cancelar apartado</Text></Pressable>
    </View>)}
    <Text style={styles.footnote}>Apartados de demostración: solo se conservan mientras la app está abierta y no generan un pedido pagado.</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F3EC' }, page: { padding: 20, paddingBottom: 38, maxWidth: 650, width: '100%', alignSelf: 'center' }, eyebrow: { color: '#68806D', fontSize: 9, fontWeight: '900', letterSpacing: 1.4, marginTop: 8 }, title: { color: '#1D3024', fontSize: 27, fontWeight: '900', marginTop: 4 }, description: { color: '#788178', fontSize: 11, lineHeight: 16, marginTop: 4, marginBottom: 18 }, summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E3A2C', borderRadius: 17, padding: 14, marginBottom: 15 }, summaryLabel: { color: '#BBD0BF', fontSize: 7, lineHeight: 10, fontWeight: '800', maxWidth: 90 }, summaryValue: { color: '#D2E9A7', fontSize: 15, fontWeight: '900', marginTop: 4 }, summaryDivider: { height: 32, width: 1, backgroundColor: '#47604F' }, empty: { alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 22, paddingVertical: 32, borderWidth: 1, borderColor: '#E8E9E1' }, emptyIcon: { height: 55, width: 55, borderRadius: 18, backgroundColor: '#E9F0E4', alignItems: 'center', justifyContent: 'center' }, bag: { color: '#43835B', fontSize: 31, fontWeight: '700' }, emptyTitle: { color: '#24372B', fontSize: 16, fontWeight: '900', marginTop: 14 }, emptyText: { color: '#737E75', textAlign: 'center', fontSize: 11, lineHeight: 17, marginTop: 7 }, tip: { backgroundColor: '#F1F5ED', borderRadius: 11, padding: 10, marginTop: 16, width: '100%' }, tipText: { color: '#4F6B55', fontSize: 10, fontWeight: '700', textAlign: 'center' }, card: { backgroundColor: '#FFF', borderRadius: 18, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E7E9E1' }, cardHead: { flexDirection: 'row', alignItems: 'center' }, productIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#F3F1E8', alignItems: 'center', justifyContent: 'center' }, emoji: { fontSize: 22 }, productCopy: { flex: 1, marginLeft: 10 }, productName: { color: '#24362A', fontSize: 13, fontWeight: '900' }, category: { color: '#7C857D', fontSize: 9, marginTop: 3 }, price: { color: '#2E754C', fontSize: 16, fontWeight: '900' }, divider: { height: 1, backgroundColor: '#ECEDE7', marginVertical: 11 }, detail: { flexDirection: 'row', alignItems: 'center', marginTop: 7 }, detailIcon: { width: 20, color: '#548363', fontSize: 13 }, detailText: { color: '#5F6C62', fontSize: 10 }, pickupNote: { borderRadius: 10, backgroundColor: '#F2F6EE', padding: 9, marginTop: 11 }, pickupNoteText: { color: '#55705A', fontSize: 9, lineHeight: 13 }, cancelButton: { alignItems: 'center', borderWidth: 1, borderColor: '#E7CACA', borderRadius: 10, paddingVertical: 9, marginTop: 10 }, cancelText: { color: '#A64949', fontSize: 10, fontWeight: '800' }, footnote: { color: '#858C85', textAlign: 'center', fontSize: 9, lineHeight: 14, marginTop: 8, paddingHorizontal: 8 },
});
