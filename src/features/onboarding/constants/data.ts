import i18n from '#lang/i18n';

import { OnboardingData } from '../types';

export const ONBOARDING_DATA: OnboardingData[] = [
  {
    id: 0,
    stepName: 'welcome',
    title: i18n.t('screens.onboarding.welcome'),
    description: i18n.t('screens.onboarding.welcomeDescription'),
    image: require('#assets/lottie/6.json'),
    ctaTitle: i18n.t('screens.onboarding.next'),
  },
  {
    id: 1,
    stepName: 'location',
    title: i18n.t('screens.onboarding.discover'),
    description: i18n.t('screens.onboarding.discoverDescription'),
    image: require('#assets/lottie/7.json'),
    ctaTitle: i18n.t('screens.onboarding.discoverCta'),
  },
  {
    id: 2,
    stepName: 'qrCode',
    title: i18n.t('screens.onboarding.qrCode'),
    description: i18n.t('screens.onboarding.qrCodeDescription'),
    image: require('#assets/lottie/8.json'),
    ctaTitle: i18n.t('screens.onboarding.next'),
  },
  {
    id: 3,
    stepName: 'maps',
    title: i18n.t('screens.onboarding.maps'),
    description: i18n.t('screens.onboarding.mapsDescription'),
    image: require('#assets/lottie/9.json'),
    ctaTitle: i18n.t('screens.onboarding.next'),
  },
  {
    id: 4,
    stepName: 'notifications',
    title: i18n.t('screens.onboarding.notifications'),
    description: i18n.t('screens.onboarding.notificationsDescription'),
    image: require('#assets/lottie/10.json'),
    ctaTitle: i18n.t('screens.onboarding.notificationsCta'),
  },
  {
    id: 5,
    stepName: 'ready',
    title: i18n.t('screens.onboarding.ready'),
    description: i18n.t('screens.onboarding.readyDescription'),
    image: require('#assets/lottie/11.json'),
    ctaTitle: i18n.t('screens.onboarding.readyCta'),
  },
];
