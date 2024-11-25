import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import  GlobalProvider  from '@/context/GlobalProvider';
import { useColorScheme } from '@/hooks/useColorScheme.web';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Runy":require("../assets/fonts/RubikVinyl-Regular.ttf"),
    "Mental":require("../assets/fonts/MetalMania-Regular.ttf"),
    "MeriendaBlack":require("../assets/fonts/Merienda-Black.ttf"),
    "MeriendaBold":require("../assets/fonts/Merienda-Bold.ttf"),
    "MeriendaExtraBold":require("../assets/fonts/Merienda-ExtraBold.ttf"),
    "MeriendaLight":require("../assets/fonts/Merienda-Light.ttf"),
    "MeriendaMedium":require("../assets/fonts/Merienda-Medium.ttf"),
    "MeriendaRegular":require("../assets/fonts/Merienda-Regular.ttf"),
    "MeriendaSemiBold":require("../assets/fonts/Merienda-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Contact" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  );
}
