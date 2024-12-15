import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { APP_BAR_HEIGHT } from '#static';

import { Container, Svg, Text } from './atoms';
import { SvgComponent } from './atoms/svg';

export interface MainHeaderProps {
  title: string;
  leftConfig?: {
    Icon?: SvgComponent;
    action?: () => void;
  };
  mode?: 'view' | 'edit';
  RightComponent?: () => React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * MainHeader component with a title, optional left icon and right component.
 * @param {MainHeaderProps} props - The component props.
 * @param {string} title - The title to be displayed on the header.
 * @param {StyleProp<ViewStyle>} containerStyle - Additional style for the container.
 * @param {string} mode - The mode of the header, 'view' or 'edit'.
 * @param {LeftConfig} leftConfig - Configuration for the left icon and action.
 * @param {React.ReactNode} RightComponent - The component to be displayed on the right side.
 * @returns {React.ReactElement} The MainHeader component.
 */
export default function MainHeader({
  title,
  containerStyle,
  leftConfig,
  RightComponent,
  mode = 'view',
}: MainHeaderProps) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Container testID="main-header-container" style={[styles.container(mode), containerStyle]}>
      {leftConfig?.Icon && leftConfig?.action && (
        <TouchableOpacity testID="main-header-left-button" onPress={leftConfig.action}>
          <Svg
            Icon={leftConfig.Icon}
            width={22}
            height={22}
            fill={mode === 'view' ? theme.colors.white : theme.colors.primary}
          />
        </TouchableOpacity>
      )}
      <View style={styles.headerTitleWrapper} pointerEvents="none">
        <Text style={styles.headerTitle(mode)}>{title}</Text>
      </View>
      {RightComponent && <RightComponent />}
    </Container>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: (mode: 'view' | 'edit') => ({
    position: 'relative',
    height: APP_BAR_HEIGHT,
    backgroundColor: mode === 'view' ? theme.colors.primary : theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  headerTitleWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  headerTitle: (mode: 'view' | 'edit') => ({
    color: mode === 'view' ? theme.colors.white : theme.colors.primary,
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.fontSizes.lg,
    marginHorizontal: 'auto',
  }),
}));
