import { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';

import LottieView from 'lottie-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { OnboardingData } from '../types';

interface OnboardingItemProps {
  item: OnboardingData;
  skipped: boolean;
  onSkip: () => void;
}

const width = Dimensions.get('window').width;

export default function OnboardingItem({ item, skipped, onSkip }: OnboardingItemProps) {
  const ref = useRef<LottieView>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    const timeoutEnter = setTimeout(() => {
      if (isFirstTime) {
        ref.current?.play(0, 35);
      } else {
        ref.current?.play(35, 179);
      }
    }, 0);

    const timeoutExit = setTimeout(() => {
      if (isFirstTime) {
        setIsFirstTime(false);
      }
    }, 1100);

    return () => {
      clearTimeout(timeoutEnter);
      clearTimeout(timeoutExit);
    };
  }, [isFirstTime]);

  useEffect(() => {
    if (skipped) {
      onSkip();
      ref.current?.play(180, 208);
    }
  }, [skipped]);

  return (
    <View style={styles.item}>
      <LottieView source={item.image} style={styles.lottieView} ref={ref} />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  item: {
    width,
    height: width * 0.8,
    padding: theme.spacing[8],
    paddingBottom: theme.spacing[5],
  },
  lottieView: {
    backgroundColor: '',
    width: '100%',
    height: '100%',
  },
}));
