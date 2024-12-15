import { memo } from 'react';
import { View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpoLink } from '#components';
import { Text } from '#components/atoms';

export interface AuthenticationLayoutProps {
  headerText: string;
  descriptionText: string;
  children: React.ReactNode;
  href: string;
  linkText: string;
}

function AuthenticationLayout({
  headerText,
  descriptionText,
  children,
  href,
  linkText,
}: AuthenticationLayoutProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.descriptionText}>{descriptionText}</Text>
      <View style={styles.formWrapper}>{children}</View>
      <View style={styles.buttonWrapper}>
        <ExpoLink href={href} linkText={linkText} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default memo(AuthenticationLayout);

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerText: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.typography.PRIMARY[800],
    fontSize: 22,
    marginBottom: theme.spacing[1.5],
  },
  descriptionText: {
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.typography.PRIMARY[600],
    fontSize: theme.fontSizes.md,
    paddingBottom: theme.spacing[12],
  },
  formWrapper: {
    gap: theme.spacing[4],
  },
  buttonWrapper: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: theme.spacing[6],
  },
}));
