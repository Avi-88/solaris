import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useWallet } from '@/hooks/WalletProvider';

interface EventItem {
  id: string;
  title: string;
  city: string;
  venue: string;
  date: string;       // ISO Date – e.g. 2025‑09‑12
  time: string;       // 24‑h – e.g. 18:30
  banner: string;     // remote uri or local asset
  price: string;      // “0.8 SOL”
  brand: 'nasa' | 'spacex' | 'isro' | 'uksa'; // used for gradient
}

/**
 *  Sample data
 *  (unchanged except new fields & brands)
 */
const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'spacex',
  },
    {
    id: '2',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'nasa',
  },
    {
    id: '3',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'isro',
  },
    {
    id: '4',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'uksa',
  },
    {
    id: '5',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'spacex',
  },
    {
    id: '5',
    title: 'London NFT Expo',
    city: 'London, UK',
    venue: 'Olympia',
    date: '2025‑07‑18',
    time: '10:00',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    price: '1.2 SOL',
    brand: 'uksa',
  },
  // …add the rest
];

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 160;
const CARD_RADIUS = 16;

export default function HomeScreen() {
  const { publicKey, disconnect, loading } = useWallet();

  /** ---------- Helpers ---------- */
  const getDisplayKey = () => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}…${base58.slice(-4)}`;
  };

  const gradientFor = (brand: EventItem['brand']) => {
    switch (brand) {
      case 'nasa':
        return ['#d62929', '#b5183e'];
      case 'spacex':
        return ['#0070ff', '#128aff'];
      case 'isro':
        return ['#ff9e2c', '#ff6b3d'];
      case 'uksa':
      default:
        return ['#18b07b', '#0e8f5e'];
    }
  };

  /** ---------- Render ---------- */
  const renderCard = ({ item }: { item: EventItem }) => (
    <Pressable
      style={styles.cardWrapper}
      onPress={() => {
        /* navigation */
      }}
    >
      <LinearGradient
        colors={gradientFor(item.brand)}
        style={styles.cardGradient}
      >
        {/* Ship icon */}
        <Ionicons
          name="rocket-outline"
          size={32}
          color="rgba(255,255,255,0.45)"
          style={styles.rocket}
        />

        {/* Event meta */}
        <View style={styles.cardContent}>
          <Text style={styles.brand}>{item.title}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>On </Text>
            <Text style={styles.value}>
              {formatDate(item.date)} • {item.time}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Where </Text>
            <Text style={styles.value}>{item.city}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Venue </Text>
            <Text style={styles.value}>{item.venue}</Text>
          </View>
        </View>

        {/* Price + chevron */}
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.circleBtn}>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/32.jpg',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.username}>{getDisplayKey()}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Pressable onPress={disconnect} disabled={loading}>
          <Ionicons name="menu" size={28} color="#fff" />
        </Pressable>
      </View>

      {/* ---------- List of events ---------- */}
      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* ---------- Floating Action Button ---------- */}
      <Pressable style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={32} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   utils                                    */
/* -------------------------------------------------------------------------- */

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
}

/* -------------------------------------------------------------------------- */
/*                                  styles                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  welcome: { fontSize: 12, color: '#78828a' },
  username: { fontSize: 16, color: '#fff', fontWeight: '600' },

  /* ---------- Card ---------- */
  cardWrapper: {
    width: width - 32,
    height: CARD_HEIGHT,
    marginBottom: 16,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    elevation: 3,
  },
  cardGradient: {
    flex: 1,
    borderRadius: CARD_RADIUS,
    padding: 18,
  },
  rocket: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  value: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  priceBlock: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    alignItems: 'flex-end',
  },
  price: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  circleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ---------- FAB ---------- */
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7d1cff', // Solana purple
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
