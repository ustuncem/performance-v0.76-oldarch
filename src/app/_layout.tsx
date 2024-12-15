import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { toastConfig } from '#components/toast';
import { QUERY_CLIENT } from '#static';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <QueryClientProvider client={QUERY_CLIENT}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider>
            <KeyboardProvider>
              <PortalProvider>
                <BottomSheetModalProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  />
                </BottomSheetModalProvider>
                <PortalHost name="BottomSheet" />
              </PortalProvider>
              <Toast config={toastConfig} />
            </KeyboardProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
  },
}));
