import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React, { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { WalletProvider, useWallet } from '@/hooks/WalletProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <WalletProvider>
        <RootLayoutNav />
      </WalletProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { connected, loading } = useWallet();

  useEffect(() => {
    if (!loading) {
      if (connected) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/connect');
      }
    }
  }, [connected, loading]);

  if (loading) {
    // You can render a splash screen or loading indicator here
    return null; 
  }

  return (
    <ActionSheetProvider>
      <React.Fragment>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)/connect" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </React.Fragment>
    </ActionSheetProvider>
  );
}