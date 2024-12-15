import { useEffect } from 'react';
import { Platform } from 'react-native';

import RNKeyboardManager from 'react-native-keyboard-manager';

export default function useKeyboardManagerIOS() {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      RNKeyboardManager.setEnable(true);
      RNKeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }

    return () => {
      if (Platform.OS === 'ios') {
        RNKeyboardManager.setEnable(false);
        RNKeyboardManager.setToolbarPreviousNextButtonEnable(false);
      }
    };
  }, []);
}
