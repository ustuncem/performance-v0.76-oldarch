import { View } from 'react-native';

import Constants from 'expo-constants';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Bumerang } from '#assets/svg';

import { Svg, Text } from './atoms';
import MainLayout, { MainLayoutProps } from './main-layout';

const NORMAL_HEADER_HEIGHT = '25%';
const NORMAL_CONTENT_HEIGHT = '75%';

export interface FormLayoutProps extends Omit<MainLayoutProps, 'children'> {
  children: React.ReactNode;
  title: string;
  headerPercentage?: string;
  bottomSheetPercentage?: string;
}

export default function FormLayout({
  children,
  title,
  headerPercentage = NORMAL_HEADER_HEIGHT,
  bottomSheetPercentage = NORMAL_CONTENT_HEIGHT,
  ...rest
}: FormLayoutProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <MainLayout style={styles.formContainer} {...rest}>
      <View style={styles.layoutIcon}>
        <Svg Icon={Bumerang} width={351} height={390} />
      </View>
      <View style={styles.formHeader(headerPercentage)}>
        <Text style={styles.formHeaderTitle}>{title}</Text>
      </View>
      <View style={styles.formContent(bottomSheetPercentage)}>{children}</View>
    </MainLayout>
  );
}

const stylesheet = createStyleSheet(theme => ({
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  layoutIcon: {
    position: 'absolute',
    top: -50,
    right: 10,
    transform: [{ rotate: '45deg' }],
  },
  formHeader: (height: any) => ({
    height,
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight / 2,
    paddingHorizontal: theme.spacing[4],
  }),
  formHeaderTitle: {
    fontSize: theme.fontSizes['4xl'],
    color: theme.colors.white,
    fontFamily: theme.fontFamily.bold,
  },
  formContent: (height: any) => ({
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[6],
    height,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius['5xl'],
    borderTopRightRadius: theme.borderRadius['5xl'],
  }),
}));
