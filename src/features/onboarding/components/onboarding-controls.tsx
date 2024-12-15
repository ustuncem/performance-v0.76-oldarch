import { Platform, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { DoubleArrowRight } from '#assets/svg';
import Link from '#components/link';

import OnboardingButton from './onboarding-button';

interface OnboardingControlsProps {
  handleSkip: () => void;
  handleNext: () => void;
  buttonText: string;
}

export default function OnboardingControls({
  handleSkip,
  handleNext,
  buttonText,
}: OnboardingControlsProps) {
  const { t } = useTranslation();
  const { styles, theme } = useStyles(stylesheet);
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.controls,
        {
          paddingBottom: Platform.select({
            ios: bottom + theme.spacing[1],
            android: bottom + theme.spacing[6],
          }),
        },
      ]}>
      <Link textStyle={styles.skip} text={t('screens.onboarding.skip')} onPress={handleSkip} />
      <OnboardingButton Icon={DoubleArrowRight} onPress={handleNext}>
        {t(buttonText)}
      </OnboardingButton>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: theme.spacing[3],
    backgroundColor: theme.colors.primary,
    padding: theme.spacing[6],
    width: '100%',
    borderTopLeftRadius: theme.spacing[5],
    borderTopRightRadius: theme.spacing[5],
  },
  skip: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
  },
}));
