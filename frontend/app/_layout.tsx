import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import SelectLanguage from '../components/LanguageSelect';

import { useColorScheme } from '@/components/useColorScheme';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [onboardingState, setOnboardingState] = useState(0);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Render the first onboarding modal if onboardingState is 0
  if (onboardingState === 0) {
    return (
      
        <Modal>
          <View style={styles.container}>
          <SelectLanguage />
          {/* Language selection modal content here */}
          <Button title="➡️"  onPress={() => setOnboardingState(1)} />
          </View>
        </Modal>
    );
  }

  // Render the second onboarding modal if onboardingState is 1
  if (onboardingState === 1) {
    return (
      <Modal>
        <View style={styles.container}>
          {/* Interest selection modal content here */}
          <Button title="Finish" onPress={() => setOnboardingState(null)} />
        </View>
      </Modal>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="onboarding1" options={{ presentation: 'modal' }} />
        <Stack.Screen name="onboarding2" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
