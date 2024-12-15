import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Svg, Text } from '#components/atoms';
import { SvgComponent } from '#components/atoms/svg';

interface OnboardingButtonProps {
  children: React.ReactNode;
  Icon: SvgComponent;
  onPress: () => void;
}

function OnboardingButton({ children, Icon, onPress }: OnboardingButtonProps) {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.buttonShadow(0.7, -10)} />
      <View style={styles.buttonShadow(0.5, -20)} />
      <View style={styles.wrapper}>
        <Text style={styles.text}>{children}</Text>
        <Svg Icon={Icon} width={20} height={20} strokeWidth={2} stroke={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

export default memo(OnboardingButton);

const stylesheet = createStyleSheet(theme => ({
  container: {
    position: 'relative',
    flex: 0.7,
  },
  wrapper: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing[3],
    borderRadius: theme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primary,
  },
  buttonShadow: (opacity: number, left: number) => ({
    ...StyleSheet.absoluteFillObject,
    left,
    borderRadius: theme.spacing[4],
    zIndex: -1,
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  }),
}));
