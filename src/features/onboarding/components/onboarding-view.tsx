import { useCallback, useState } from 'react';
import { View } from 'react-native';

import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { useDebounce } from '@uidotdev/usehooks';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '#components/atoms';
import { show } from '#lib';

import { OnboardingData } from '../types';
import OnboardingControls from './onboarding-controls';
import Pagination from './onboarding-indicator';
import OnboardingItem from './onboarding-item';

const FadeInDownConfig = FadeInDown.springify().damping(18).stiffness(200);
const FadeOutUpConfig = FadeOutUp.springify().damping(18).stiffness(200);

export default function OnboardingView({ data }: { data: OnboardingData[] }) {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const debouncedIndex = useDebounce(currentIndex, 800);

  const currentItem = data[debouncedIndex];

  const toggleSkip = useCallback(() => {
    setSkipped(prev => !prev);
  }, []);

  const handleNavigateToLogin = useCallback(() => {
    router.replace('/register-first');
  }, []);

  const handleNotificationsPermission = useCallback(async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      show({
        content: t('screens.onboarding.notificationsPermissionDenied'),
        type: 'danger',
      });
    }

    setCurrentIndex(prev => prev + 1);
    toggleSkip();
  }, []);

  const handleLocationPermission = useCallback(async () => {
    const locationResponse = await Location.requestForegroundPermissionsAsync();

    if (!locationResponse.granted) {
      show({
        content: t('screens.onboarding.locationPermissionDenied'),
        type: 'danger',
      });
    }
    setCurrentIndex(prev => prev + 1);
    toggleSkip();
  }, [currentIndex]);

  const handleNext = useCallback(async () => {
    const stepName = data[currentIndex].stepName;
    if (stepName === 'location') {
      await handleLocationPermission();
    } else if (stepName === 'notifications') {
      await handleNotificationsPermission();
    } else if (currentIndex === data.length - 1) {
      handleNavigateToLogin();
    } else {
      setCurrentIndex(prev => prev + 1);
      toggleSkip();
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <OnboardingItem
        key={debouncedIndex}
        item={currentItem}
        skipped={skipped}
        onSkip={toggleSkip}
      />
      <View style={styles.main}>
        <Pagination count={data.length} selectedIndex={debouncedIndex} />
        <View style={styles.content}>
          <Animated.View
            key={currentItem.title}
            entering={FadeInDownConfig}
            exiting={FadeOutUpConfig}>
            <Text style={styles.title}>{currentItem.title}</Text>
          </Animated.View>
          <Animated.View
            key={currentItem.description}
            style={styles.descriptionContainer}
            entering={FadeInDownConfig}
            exiting={FadeOutUpConfig}>
            <Text style={styles.description}>{currentItem.description}</Text>
          </Animated.View>
        </View>
      </View>
      <OnboardingControls
        handleSkip={handleNavigateToLogin}
        handleNext={handleNext}
        buttonText={currentItem.ctaTitle}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingTop: theme.spacing[12],
    gap: theme.spacing[6],
  },
  main: {
    gap: theme.spacing[9],
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '90%',
    gap: theme.spacing[3],
  },
  title: {
    fontSize: 22,
    fontFamily: theme.fontFamily.semiBold,
    textAlign: 'center',
    color: theme.colors.typography.PRIMARY[800],
  },
  description: {
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.typography.PRIMARY[600],
  },
  descriptionContainer: {
    width: '80%',
  },
}));
