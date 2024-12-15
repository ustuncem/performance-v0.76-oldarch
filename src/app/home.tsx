import { View } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '#components/atoms';

export default function Home() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello buum-e homepage</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: theme.fontSizes['4xl'],
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.primary,
  },
}));
