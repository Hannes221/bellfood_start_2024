import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SelectLanguage from '../components/LanguageSelect';
import SelectInterests from '../components/InterestsSelect';

import EmailInput from '@/components/EmailInput';

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

  const [email, setEmail] = useState('');

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

  const _storeData = async (emailValue: string) => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key', emailValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  async function sendData() {
    const email = await AsyncStorage.getItem('@MySuperStore');
    setOnboardingState(1);
    _storeData(email!);
  }

  if (onboardingState === 0) {
    return (
      <Modal>
        <View style={styles.container}>
          <EmailInput />
          {/* Language selection modal content here */}
          <Button title="Submit" onPress={() => sendData()} />
        </View>
      </Modal>
    );
  }

  // Render the second onboarding modal if onboardingState is 1
  if (onboardingState === 1) {
    return (
      <Modal>
        <View style={styles.container}>
          <SelectLanguage />
          {/* Language selection modal content here */}
          <Button title="➡️" onPress={() => setOnboardingState(2)} />
        </View>
      </Modal>
    );
  }

  if (onboardingState === 2) {
    return (
      <Modal>
        <View style={styles.container}>
          <SelectInterests />
          {/* Interest selection modal content here */}
          <Button title="Finish ✅" onPress={() => setOnboardingState(null)} />
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
  input: {
    width: '80%', // You can adjust the width as needed
    borderColor: 'gray', // Border color
    borderWidth: 1, // Border width
    padding: 10, // Padding for the input field
    marginBottom: 10, // Margin bottom to separate the input from the button
    borderRadius: 15, // Border radius to match the button
  },
});
