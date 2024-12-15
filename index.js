import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import 'expo-router/entry';

import './src/themes/unistyles';
import './src/lang/i18n';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
