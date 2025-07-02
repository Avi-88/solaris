import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWallet } from '@/hooks/WalletProvider';

export default function HomeScreen() {
  const { publicKey, disconnect, loading } = useWallet();

  const getDisplayKey = () => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* User Info Card */}
      <ThemedView style={styles.userInfoCard}>
        <ThemedText type="subtitle">Connected Wallet</ThemedText>
        <ThemedText style={styles.publicKeyText}>{getDisplayKey()}</ThemedText>
        <Button title="Disconnect" onPress={disconnect} disabled={loading} color="#FF6347" />
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          <ThemedText>Edit </ThemedText>
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
          <ThemedText> to see changes. Press</ThemedText>
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>
          <ThemedText> to open developer tools.</ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          <ThemedText>{`When you're ready, run `}</ThemedText>
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
          <ThemedText> to get a fresh</ThemedText>
          <ThemedText type="defaultSemiBold"> app</ThemedText>
          <ThemedText> directory. This will move the current</ThemedText>
          <ThemedText type="defaultSemiBold"> app</ThemedText>
          <ThemedText> to</ThemedText>
          <ThemedText type="defaultSemiBold"> app-example</ThemedText>
          <ThemedText>.</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  userInfoCard: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  publicKeyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
});
