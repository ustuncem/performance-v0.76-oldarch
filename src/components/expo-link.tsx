import { Link } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ExpoLinkProps {
  href: string;
  linkText: string;
}

export default function ExpoLink({ href, linkText }: ExpoLinkProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <Link replace href={href} style={styles.linkText}>
      {linkText}
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  linkText: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.typography.PRIMARY[800],
    fontSize: theme.fontSizes.md,
    textDecorationLine: 'underline',
  },
}));
