import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchAlerts } from '@/lib/watch-state';

type Product = { name: string; unit: string; category: string; stores: { name: string; price: number; color: string }[] };

const PRODUCTS: Product[] = [
  { name: 'Leche entera', unit: '1 litro', category: 'Lácteos', stores: [{ name: 'Abarrotes Sol', price: 27.5, color: '#E8A94B' }, { name: 'Mercado Central', price: 29, color: '#488A69' }, { name: 'Súper Norte', price: 31.9, color: '#5873A4' }] },
  { name: 'Arroz', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Mercado Central', price: 28, color: '#488A69' }, { name: 'Abarrotes Sol', price: 31.5, color: '#E8A94B' }, { name: 'Súper Norte', price: 34, color: '#5873A4' }] },
  { name: 'Huevo', unit: 'docena', category: 'Despensa', stores: [{ name: 'Súper Norte', price: 42, color: '#5873A4' }, { name: 'Mercado Central', price: 44.5, color: '#488A69' }, { name: 'Abarrotes Sol', price: 48, color: '#E8A94B' }] },
  { name: 'Tortillas', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Abarrotes Sol', price: 26, color: '#E8A94B' }, { name: 'Súper Norte', price: 27, color: '#5873A4' }, { name: 'Mercado Central', price: 29, color: '#488A69' }] },
  { name: 'Frijol', unit: '1 kg', category: 'Despensa', stores: [{ name: 'Mercado Central', price: 36, color: '#488A69' }, { name: 'Abarrotes Sol', price: 39, color: '#E8A94B' }, { name: 'Súper Norte', price: 42, color: '#5873A4' }] },
];
const CATEGORIES = ['Todo', 'Despensa', 'Lácteos'];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todo');
  const { saved, toggleSaved } = useWatchAlerts();
  const products = useMemo(() => PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) && (category === 'Todo' || item.category === category)), [query, category]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View><Text style={styles.eyebrow}>AHORRO PARA TODOS</Text><Text style={styles.title}>Canasta<Text style={styles.titleAccent}>Lista</Text></Text></View>
          <View style={styles.location}><Text style={styles.pin}>⌖</Text><Text style={styles.locationText}>Hermosillo</Text></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroTop}><Text style={styles.heroTag}>TU COMUNIDAD, MEJOR INFORMADA</Text><Text style={styles.heroEmoji}>🛒</Text></View>
          <Text style={styles.heroTitle}>Lo básico, al{ '\n' }mejor precio.</Text>
          <Text style={styles.heroCopy}>Compara precios de productos esenciales en tiendas cercanas.</Text>
          <View style={styles.heroStat}><Text style={styles.statNumber}>5</Text><Text style={styles.statText}>productos comparados</Text><View style={styles.statDot} /><Text style={styles.statText}>3 tiendas</Text></View>
        </View>

        <View style={styles.sectionHeading}><View><Text style={styles.sectionTitle}>Canasta básica</Text><Text style={styles.muted}>El precio más bajo primero</Text></View><Text style={styles.demoLabel}>● DATOS DEMO</Text></View>
        <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Buscar un producto..." placeholderTextColor="#8A918A" style={styles.search} /></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {CATEGORIES.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.filter, category === item && styles.filterActive]}><Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text></Pressable>)}
        </ScrollView>

        {products.map((product) => {
          const lowest = product.stores[0];
          const isSaved = saved.includes(product.name);
          return <View style={styles.productCard} key={product.name}>
            <View style={styles.productTop}><View style={styles.productGlyph}><Text style={styles.glyphText}>{product.name === 'Leche entera' ? '🥛' : product.name === 'Huevo' ? '🥚' : product.name === 'Tortillas' ? '🫓' : '🌾'}</Text></View><View style={styles.productNameWrap}><Text style={styles.productName}>{product.name}</Text><Text style={styles.muted}>{product.unit} · {product.category}</Text></View><Pressable accessibilityLabel={isSaved ? 'Quitar alerta' : 'Avisarme si cambia el precio'} onPress={() => toggleSaved(product.name)} style={[styles.bellButton, isSaved && styles.bellActive]}><Text style={[styles.bell, isSaved && styles.bellOn]}>{isSaved ? '✓' : '♧'}</Text></Pressable></View>
            <View style={styles.bestRow}><View><Text style={styles.bestLabel}>MEJOR PRECIO</Text><Text style={styles.storeName}>{lowest.name}</Text></View><Text style={styles.price}>${lowest.price.toFixed(2)}</Text></View>
            <View style={styles.otherStores}>{product.stores.slice(1).map((store) => <View key={store.name} style={styles.storeRow}><View style={[styles.storeDot, { backgroundColor: store.color }]} /><Text style={styles.storeOther}>{store.name}</Text><Text style={styles.storePrice}>${store.price.toFixed(2)}</Text></View>)}</View>
            <Pressable onPress={() => toggleSaved(product.name)} style={[styles.alertButton, isSaved && styles.alertButtonOn]}><Text style={[styles.alertButtonText, isSaved && styles.alertButtonTextOn]}>{isSaved ? '✓  Alerta de precio activada' : '◷  Avísame si baja el precio'}</Text></Pressable>
          </View>;
        })}
        {products.length === 0 && <View style={styles.empty}><Text style={styles.emptyTitle}>No encontramos ese producto</Text><Text style={styles.muted}>Prueba con otra búsqueda.</Text></View>}
        <Text style={styles.footnote}>Precios de ejemplo para la demostración. En una versión real, las tiendas y la comunidad compartirían precios actualizados.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F4EE' }, page: { padding: 20, paddingBottom: 38, maxWidth: 640, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, eyebrow: { color: '#6D776B', fontSize: 10, letterSpacing: 1.7, fontWeight: '800' }, title: { fontSize: 30, letterSpacing: -1.2, color: '#18291F', fontWeight: '800' }, titleAccent: { color: '#328264' }, location: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, backgroundColor: '#E9EDE5', paddingHorizontal: 11, paddingVertical: 8 }, pin: { fontSize: 16, color: '#328264' }, locationText: { fontSize: 12, color: '#425347', fontWeight: '700' },
  hero: { backgroundColor: '#1D3C2E', borderRadius: 23, padding: 21, marginBottom: 26, overflow: 'hidden' }, heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, heroTag: { color: '#BED9C5', fontSize: 9, letterSpacing: 1.2, fontWeight: '800' }, heroEmoji: { fontSize: 28 }, heroTitle: { fontSize: 30, lineHeight: 34, color: '#FFFDF4', fontWeight: '800', letterSpacing: -0.8, marginTop: 11 }, heroCopy: { fontSize: 13, color: '#D0DED2', lineHeight: 20, marginTop: 8, maxWidth: 260 }, heroStat: { borderTopColor: '#476452', borderTopWidth: 1, marginTop: 18, paddingTop: 13, flexDirection: 'row', alignItems: 'center', gap: 7 }, statNumber: { color: '#DBE9B7', fontWeight: '800', fontSize: 14 }, statText: { color: '#D4E0D5', fontSize: 11 }, statDot: { width: 3, height: 3, backgroundColor: '#A8C4AF', borderRadius: 4, marginHorizontal: 3 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 13 }, sectionTitle: { color: '#192A20', fontSize: 20, fontWeight: '800', letterSpacing: -0.4 }, muted: { color: '#778078', fontSize: 12, marginTop: 3 }, demoLabel: { color: '#8A918A', fontSize: 8, letterSpacing: 0.6, fontWeight: '800', marginBottom: 3 }, searchBox: { height: 47, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E8E0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 8 }, searchIcon: { fontSize: 22, color: '#65736A' }, search: { flex: 1, color: '#1C2C22', fontSize: 14 }, filters: { gap: 8, paddingVertical: 13 }, filter: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#EAECE5' }, filterActive: { backgroundColor: '#2D7255' }, filterText: { color: '#526056', fontWeight: '700', fontSize: 12 }, filterTextActive: { color: '#FFFFFF' },
  productCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#EDEDE6' }, productTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 }, productGlyph: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#F3F2EA', alignItems: 'center', justifyContent: 'center' }, glyphText: { fontSize: 21 }, productNameWrap: { flex: 1, marginLeft: 11 }, productName: { fontSize: 15, fontWeight: '800', color: '#1B2A20' }, bellButton: { height: 34, width: 36, borderRadius: 11, backgroundColor: '#F1F2EC', alignItems: 'center', justifyContent: 'center' }, bellActive: { backgroundColor: '#E1EFE5' }, bell: { fontSize: 18, color: '#6B776E' }, bellOn: { color: '#27714E', fontWeight: '800' }, bestRow: { backgroundColor: '#F2F6EF', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, bestLabel: { fontSize: 8, letterSpacing: 1, color: '#57735C', fontWeight: '800' }, storeName: { fontSize: 12, color: '#26392C', fontWeight: '700', marginTop: 3 }, price: { color: '#266B4B', fontSize: 20, fontWeight: '800' }, otherStores: { paddingHorizontal: 4, paddingTop: 9, paddingBottom: 5 }, storeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }, storeDot: { width: 7, height: 7, borderRadius: 5, marginRight: 8 }, storeOther: { flex: 1, color: '#68736A', fontSize: 12 }, storePrice: { color: '#3D4840', fontSize: 12, fontWeight: '700' }, alertButton: { borderWidth: 1, borderColor: '#DDE6DA', borderRadius: 11, paddingVertical: 10, alignItems: 'center', marginTop: 5 }, alertButtonOn: { borderColor: '#BBD8C1', backgroundColor: '#F1F7F0' }, alertButtonText: { color: '#357253', fontSize: 12, fontWeight: '700' }, alertButtonTextOn: { color: '#286445' }, empty: { alignItems: 'center', padding: 30 }, emptyTitle: { fontSize: 15, fontWeight: '700', color: '#27392D' }, footnote: { textAlign: 'center', fontSize: 10, lineHeight: 15, color: '#848B83', marginTop: 8, paddingHorizontal: 8 },
});
