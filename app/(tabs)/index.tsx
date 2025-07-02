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
  ScrollView,
} from 'react-native';
import { useWallet } from '@/hooks/WalletProvider';

// -----------------------------------------------------------------------------
// 👇🏻  SAMPLE DATA --------------------------------------------------------------
// -----------------------------------------------------------------------------
interface EventItem {
  id: string;
  title: string;
  city: string;
  date: string; // e.g. "2025‑07‑18"
  banner: string; // remote uri or local asset
  price: string;
}

const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'London NFT Expo',
    city: 'London, UK',
    date: '2025‑07‑18',
    banner:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60',
    price: '1.2 SOL',
  },
  {
    id: '2',
    title: 'Solana Hacker House',
    city: 'Paris, FR',
    date: '2025‑08‑05',
    banner:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=60',
    price: '0.8 SOL',
  },
  {
    id: '3',
    title: 'Crypto Carnival',
    city: 'Barcelona, ES',
    date: '2025‑09‑12',
    banner:
      'https://images.unsplash.com/photo-1600379861985-b6e6c37931f3?auto=format&fit=crop&w=1200&q=60',
    price: '1 SOL',
  },
    {
    id: '4',
    title: 'Crypto Carnival',
    city: 'Barcelona, ES',
    date: '2025‑09‑12',
    banner:
      'https://images.unsplash.com/photo-1600379861985-b6e6c37931f3?auto=format&fit=crop&w=1200&q=60',
    price: '1 SOL',
  },
    {
    id: '5',
    title: 'Crypto Carnival',
    city: 'Barcelona, ES',
    date: '2025‑09‑12',
    banner:
      'https://images.unsplash.com/photo-1600379861985-b6e6c37931f3?auto=format&fit=crop&w=1200&q=60',
    price: '1 SOL',
  },
    {
    id: '6',
    title: 'Crypto Carnival',
    city: 'Barcelona, ES',
    date: '2025‑09‑12',
    banner:
      'https://images.unsplash.com/photo-1600379861985-b6e6c37931f3?auto=format&fit=crop&w=1200&q=60',
    price: '1 SOL',
  },
];


const ITEM_WIDTH = Dimensions.get('window').width * 0.8;

export default function HomeScreen() {
  const { publicKey, disconnect, loading } = useWallet();

    const renderEventCard = ({ item }: { item: EventItem }) => (
    <Pressable style={styles.card} onPress={() => { /* navigate to details */ }}>
      <Image source={{ uri: item.banner }} style={styles.cardImage} />
      <View style={styles.cardOverlay} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.city}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );

  const getDisplayKey = () => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  };

  return (
<SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.username}>{getDisplayKey()}</Text>
        </View>
        <View style={{ flex: 1 }} />
        {/* Notification / menu icon placeholder */}
        <Pressable style={styles.menuBtn}>
          <Text onPress={disconnect} disabled={loading} style={{ fontSize: 18, color: '#fff' }}>☰</Text>
        </Pressable>
      </View>

      {/* Overview Carousel */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Pressable>
          <Text style={styles.sectionAction}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderEventCard}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
      />

      {/* Calendar & Quick actions */}
      <ScrollView style={{ flex: 1, marginTop: 24 }}>
        <View style={styles.calendarPlaceholder}>
          <Text style={{ color: '#777' }}>🎟  Calendar component here</Text>
        </View>
      </ScrollView>

      {/* Floating action button */}
      <Pressable style={styles.fab} onPress={() => { /* create event */ }}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// 👇🏻  HELPERS -----------------------------------------------------------------
// -----------------------------------------------------------------------------

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// -----------------------------------------------------------------------------
// 👇🏻  STYLES ------------------------------------------------------------------
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  welcome: {
    color: '#bbb',
    fontSize: 12,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menuBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  sectionHeader: {
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  sectionAction: {
    color: '#ff4379',
    fontSize: 14,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 2,
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    color: '#fff',
    fontSize: 12,
  },
  cardPrice: {
    color: '#ff4379',
    fontSize: 14,
    fontWeight: '600',
  },
  calendarPlaceholder: {
    height: 260,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4379',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    marginTop: -2,
    fontWeight: '600',
  },
});


