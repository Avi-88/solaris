import { StyleSheet, Button, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWallet } from '@/hooks/WalletProvider';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ConnectScreen() {
  const { connected, connect, disconnect, publicKey, loading } = useWallet();

  const getDisplayKey = () => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  };

  useEffect(() => {
    if (connected) {
      router.replace('/(tabs)');
    }
  }, [connected]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome to Solticket</ThemedText>
      <ThemedText style={styles.subtitle}>Connect your wallet to get started</ThemedText>

      <View style={styles.walletContainer}>
        {connected && publicKey ? (
          <View style={styles.connectedState}>
            <ThemedText style={styles.publicKeyText}>Connected: {getDisplayKey()}</ThemedText>
            <Button title="Disconnect" onPress={disconnect} disabled={loading} color="#FF6347" />
          </View>
        ) : (
          <Button title="Connect Wallet" onPress={connect} disabled={loading} color="#000000" />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Black text
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333', // Dark gray text
    marginBottom: 40,
    textAlign: 'center',
  },
  walletContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000', // Black border
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Light gray background for the container
  },
  connectedState: {
    alignItems: 'center',
  },
  publicKeyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000', // Black text
    textAlign: 'center',
  },
});
