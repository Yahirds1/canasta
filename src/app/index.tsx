import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchAlerts } from '@/lib/watch-state';
const CATEGORIES = ['Todo', 'Despensa', 'Lácteos'];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todo');
  const { saved, toggleSaved, products, reports, reportPrice } = useWatchAlerts();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportProduct, setReportProduct] = useState('Arroz');
  const [storeName, setStoreName] = useState('');
  const [reportValue, setReportValue] = useState('');
  const productsShown = useMemo(() => products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) && (category === 'Todo' || item.category === category)), [products, query, category]);
  const basketMin = products.reduce((sum, product) => sum + Math.min(...product.stores.map((store) => store.price)), 0);
  const basketMax = products.reduce((sum, product) => sum + Math.max(...product.stores.map((store) => store.price)), 0);
  const submitReport = () => {
    const price = Number(reportValue.replace(',', '.'));
    if (!storeName.trim() || !Number.isFinite(price) || price <= 0) {
      Alert.alert('Revisa el reporte', 'Escribe el nombre de la tienda y un precio válido.');
      return;
    }
    reportPrice(reportProduct, storeName.trim(), price);
    setReportOpen(false);
    setStoreName('');
    setReportValue('');
    Alert.alert('Precio agregado', `Gracias por compartir el precio de ${reportProduct}.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View><Text style={styles.eyebrow}>AHORRO PARA TODOS</Text><Text style={styles.title}>Canasta<Text style={styles.titleAccent}>Lista</Text></Text></View>
          <View style={styles.location}><Text style={styles.pin}>⌖</Text><Text style={styles.locationText}>Hermosillo</Text></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroTop}><Text style={styles.heroTag}>TU COMUNIDAD, MEJOR INFORMADA</Text><Text style={styles.heroEmoji}>🛒</Text></View>
          <Text style={styles.heroTitle}>Precios claros,{ '\n' }decisiones justas.</Text>
          <Text style={styles.heroCopy}>La información compartida ayuda a encontrar dónde rinde más la canasta básica.</Text>
          <View style={styles.heroStat}><Text style={styles.statNumber}>${basketMin.toFixed(0)}</Text><Text style={styles.statText}>canasta al menor precio</Text><View style={styles.statDot} /><Text style={styles.statText}>{products.length} básicos</Text></View>
        </View>

        <View style={styles.impactCard}><View style={styles.impactIcon}><Text style={styles.impactEmoji}>↕</Text></View><View style={styles.impactCopy}><Text style={styles.impactTitle}>La diferencia sí importa</Text><Text style={styles.impactText}>Comprar cada producto al precio más bajo puede ahorrar hasta ${Math.max(0, basketMax - basketMin).toFixed(2)} frente a la tienda más cara.</Text></View></View>
        <Pressable onPress={() => setReportOpen(true)} style={styles.reportButton}><Text style={styles.reportPlus}>＋</Text><View style={styles.reportCopy}><Text style={styles.reportTitle}>Comparte un precio de tu colonia</Text><Text style={styles.reportHint}>Tu reporte mejora la información para todos</Text></View><Text style={styles.reportArrow}>›</Text></Pressable>

        <View style={styles.sectionHeading}><View><Text style={styles.sectionTitle}>Canasta básica</Text><Text style={styles.muted}>El precio más bajo primero</Text></View><Text style={styles.demoLabel}>● {reports ? `${reports} REPORTE${reports === 1 ? '' : 'S'}` : 'DATOS DEMO'}</Text></View>
        <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar un producto..." placeholderTextColor="#8A918A" style={styles.search} /></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {CATEGORIES.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.filter, category === item && styles.filterActive]}><Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text></Pressable>)}
        </ScrollView>

        {productsShown.map((product) => {
          const lowest = product.stores[0];
          const isSaved = saved.includes(product.name);
          return <View style={styles.productCard} key={product.name}>
            <View style={styles.productTop}><View style={styles.productGlyph}><Text style={styles.glyphText}>{product.name === 'Leche entera' ? '🥛' : product.name === 'Huevo' ? '🥚' : product.name === 'Tortillas' ? '🫓' : '🌾'}</Text></View><View style={styles.productNameWrap}><Text style={styles.productName}>{product.name}</Text><Text style={styles.muted}>{product.unit} · {product.category}</Text></View><Pressable accessibilityLabel={isSaved ? 'Quitar alerta' : 'Avisarme si cambia el precio'} onPress={() => toggleSaved(product.name)} style={[styles.bellButton, isSaved && styles.bellActive]}><Text style={[styles.bell, isSaved && styles.bellOn]}>{isSaved ? '✓' : '♧'}</Text></Pressable></View>
            <View style={styles.bestRow}><View><Text style={styles.bestLabel}>MEJOR PRECIO</Text><Text style={styles.storeName}>{lowest.name}</Text></View><Text style={styles.price}>${lowest.price.toFixed(2)}</Text></View>
            <View style={styles.otherStores}>{product.stores.slice(1).map((store) => <View key={store.name} style={styles.storeRow}><View style={[styles.storeDot, { backgroundColor: store.color }]} /><Text style={styles.storeOther}>{store.name}</Text><Text style={styles.storePrice}>${store.price.toFixed(2)}</Text></View>)}</View>
            <Pressable onPress={() => toggleSaved(product.name)} style={[styles.alertButton, isSaved && styles.alertButtonOn]}><Text style={[styles.alertButtonText, isSaved && styles.alertButtonTextOn]}>{isSaved ? '✓  Alerta de precio activada' : '◷  Avísame si baja el precio'}</Text></Pressable>
          </View>;
        })}
        {productsShown.length === 0 && <View style={styles.empty}><Text style={styles.emptyTitle}>No encontramos ese producto</Text><Text style={styles.muted}>Prueba con otra búsqueda.</Text></View>}
        <Text style={styles.footnote}>Los precios iniciales son datos de demostración. Los reportes que agregues se reflejan en esta sesión; una publicación real requiere validar la tienda y conectar una base de datos.</Text>
      </ScrollView>
      <Modal visible={reportOpen} transparent animationType="slide" onRequestClose={() => setReportOpen(false)}>
        <View style={styles.modalShade}><View style={styles.modalCard}><View style={styles.modalHeader}><View><Text style={styles.modalEyebrow}>APORTACIÓN COMUNITARIA</Text><Text style={styles.modalTitle}>Reportar precio</Text></View><Pressable onPress={() => setReportOpen(false)}><Text style={styles.modalClose}>×</Text></Pressable></View>
          <Text style={styles.inputLabel}>Producto</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modalProducts}>{products.map((product) => <Pressable key={product.name} onPress={() => setReportProduct(product.name)} style={[styles.modalChip, reportProduct === product.name && styles.modalChipOn]}><Text style={[styles.modalChipText, reportProduct === product.name && styles.modalChipTextOn]}>{product.name}</Text></Pressable>)}</ScrollView>
          <Text style={styles.inputLabel}>Tienda o mercado</Text><TextInput value={storeName} onChangeText={setStoreName} placeholder="Ej. Mercado de mi colonia" placeholderTextColor="#899188" style={styles.modalInput} />
          <Text style={styles.inputLabel}>Precio observado (MXN)</Text><TextInput value={reportValue} onChangeText={setReportValue} placeholder="0.00" placeholderTextColor="#899188" keyboardType="decimal-pad" style={styles.modalInput} />
          <Text style={styles.modalNote}>Este precio se comparte en la comparación de la comunidad.</Text><Pressable onPress={submitReport} style={styles.submitButton}><Text style={styles.submitText}>Publicar precio</Text></Pressable>
        </View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F4EE' }, page: { padding: 20, paddingBottom: 38, maxWidth: 640, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, eyebrow: { color: '#6D776B', fontSize: 10, letterSpacing: 1.7, fontWeight: '800' }, title: { fontSize: 30, letterSpacing: -1.2, color: '#18291F', fontWeight: '800' }, titleAccent: { color: '#328264' }, location: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, backgroundColor: '#E9EDE5', paddingHorizontal: 11, paddingVertical: 8 }, pin: { fontSize: 16, color: '#328264' }, locationText: { fontSize: 12, color: '#425347', fontWeight: '700' },
  hero: { backgroundColor: '#1D3C2E', borderRadius: 23, padding: 21, marginBottom: 26, overflow: 'hidden' }, heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, heroTag: { color: '#BED9C5', fontSize: 9, letterSpacing: 1.2, fontWeight: '800' }, heroEmoji: { fontSize: 28 }, heroTitle: { fontSize: 30, lineHeight: 34, color: '#FFFDF4', fontWeight: '800', letterSpacing: -0.8, marginTop: 11 }, heroCopy: { fontSize: 13, color: '#D0DED2', lineHeight: 20, marginTop: 8, maxWidth: 260 }, heroStat: { borderTopColor: '#476452', borderTopWidth: 1, marginTop: 18, paddingTop: 13, flexDirection: 'row', alignItems: 'center', gap: 7 }, statNumber: { color: '#DBE9B7', fontWeight: '800', fontSize: 14 }, statText: { color: '#D4E0D5', fontSize: 11 }, statDot: { width: 3, height: 3, backgroundColor: '#A8C4AF', borderRadius: 4, marginHorizontal: 3 },
  impactCard: { flexDirection: 'row', gap: 12, padding: 15, borderRadius: 17, backgroundColor: '#E8F0E4', marginTop: -12, marginBottom: 11 }, impactIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: '#D4E4D0', alignItems: 'center', justifyContent: 'center' }, impactEmoji: { color: '#2B744F', fontSize: 21, fontWeight: '800' }, impactCopy: { flex: 1 }, impactTitle: { color: '#24412D', fontSize: 13, fontWeight: '800' }, impactText: { color: '#59705D', fontSize: 11, lineHeight: 16, marginTop: 3 }, reportButton: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, backgroundColor: '#FFFFFF', borderColor: '#E7E9E0', borderWidth: 1, padding: 13, marginBottom: 24 }, reportPlus: { height: 36, width: 36, borderRadius: 12, overflow: 'hidden', textAlign: 'center', textAlignVertical: 'center', color: '#287450', backgroundColor: '#E5F0E3', fontSize: 24, marginRight: 11 }, reportCopy: { flex: 1 }, reportTitle: { color: '#24362A', fontWeight: '800', fontSize: 12 }, reportHint: { color: '#788179', fontSize: 10, marginTop: 3 }, reportArrow: { color: '#738078', fontSize: 25, paddingHorizontal: 4 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 13 }, sectionTitle: { color: '#192A20', fontSize: 20, fontWeight: '800', letterSpacing: -0.4 }, muted: { color: '#778078', fontSize: 12, marginTop: 3 }, demoLabel: { color: '#8A918A', fontSize: 8, letterSpacing: 0.6, fontWeight: '800', marginBottom: 3 }, searchBox: { height: 47, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E8E0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 8 }, searchIcon: { fontSize: 22, color: '#65736A' }, search: { flex: 1, color: '#1C2C22', fontSize: 14 }, filters: { gap: 8, paddingVertical: 13 }, filter: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#EAECE5' }, filterActive: { backgroundColor: '#2D7255' }, filterText: { color: '#526056', fontWeight: '700', fontSize: 12 }, filterTextActive: { color: '#FFFFFF' },
  productCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#EDEDE6' }, productTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 }, productGlyph: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#F3F2EA', alignItems: 'center', justifyContent: 'center' }, glyphText: { fontSize: 21 }, productNameWrap: { flex: 1, marginLeft: 11 }, productName: { fontSize: 15, fontWeight: '800', color: '#1B2A20' }, bellButton: { height: 34, width: 36, borderRadius: 11, backgroundColor: '#F1F2EC', alignItems: 'center', justifyContent: 'center' }, bellActive: { backgroundColor: '#E1EFE5' }, bell: { fontSize: 18, color: '#6B776E' }, bellOn: { color: '#27714E', fontWeight: '800' }, bestRow: { backgroundColor: '#F2F6EF', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, bestLabel: { fontSize: 8, letterSpacing: 1, color: '#57735C', fontWeight: '800' }, storeName: { fontSize: 12, color: '#26392C', fontWeight: '700', marginTop: 3 }, price: { color: '#266B4B', fontSize: 20, fontWeight: '800' }, otherStores: { paddingHorizontal: 4, paddingTop: 9, paddingBottom: 5 }, storeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }, storeDot: { width: 7, height: 7, borderRadius: 5, marginRight: 8 }, storeOther: { flex: 1, color: '#68736A', fontSize: 12 }, storePrice: { color: '#3D4840', fontSize: 12, fontWeight: '700' }, alertButton: { borderWidth: 1, borderColor: '#DDE6DA', borderRadius: 11, paddingVertical: 10, alignItems: 'center', marginTop: 5 }, alertButtonOn: { borderColor: '#BBD8C1', backgroundColor: '#F1F7F0' }, alertButtonText: { color: '#357253', fontSize: 12, fontWeight: '700' }, alertButtonTextOn: { color: '#286445' }, empty: { alignItems: 'center', padding: 30 }, emptyTitle: { fontSize: 15, fontWeight: '700', color: '#27392D' }, footnote: { textAlign: 'center', fontSize: 10, lineHeight: 15, color: '#848B83', marginTop: 8, paddingHorizontal: 8 },
  modalShade: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(17,29,21,0.45)' }, modalCard: { backgroundColor: '#F8F7F1', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 22, paddingBottom: 32 }, modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 17 }, modalEyebrow: { color: '#64806A', fontWeight: '800', letterSpacing: 1.1, fontSize: 9 }, modalTitle: { color: '#203428', fontSize: 23, fontWeight: '800', marginTop: 3 }, modalClose: { fontSize: 30, color: '#637068', paddingHorizontal: 5 }, inputLabel: { fontSize: 11, color: '#526256', fontWeight: '800', marginTop: 12, marginBottom: 7 }, modalProducts: { gap: 7, paddingBottom: 3 }, modalChip: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 18, backgroundColor: '#E9ECE5' }, modalChipOn: { backgroundColor: '#2D7255' }, modalChipText: { color: '#546057', fontSize: 11, fontWeight: '700' }, modalChipTextOn: { color: '#FFFFFF' }, modalInput: { backgroundColor: '#FFFFFF', borderColor: '#E3E6DE', borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, color: '#203428', fontSize: 14 }, modalNote: { color: '#7A847C', fontSize: 10, marginTop: 12, lineHeight: 15 }, submitButton: { backgroundColor: '#286B4B', alignItems: 'center', borderRadius: 13, paddingVertical: 14, marginTop: 15 }, submitText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
