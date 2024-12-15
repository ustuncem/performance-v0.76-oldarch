import { View, ViewStyle } from 'react-native';

import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface DotProps {
  index: number;
  animation: SharedValue<number>;
}

interface PaginationProps {
  count: number;
  selectedIndex: number;
  style?: ViewStyle;
}

function PaginationIndicator({ animation }: { animation: SharedValue<number> }) {
  const { styles, theme } = useStyles(stylesheet);
  const stylez = useAnimatedStyle(() => {
    return {
      width: theme.spacing[6] + theme.spacing[6] * animation.value,
    };
  });

  return <Animated.View style={[styles.dotContainer, stylez]} />;
}

function Dot({ index, animation }: DotProps) {
  const { styles, theme } = useStyles(stylesheet);
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [theme.colors.typography.PRIMARY[300], theme.colors.white, theme.colors.white]
      ),
    };
  });
  return (
    <View style={styles.dotWrapper}>
      <Animated.View style={[styles.dot, stylez]} />
    </View>
  );
}

export default function Pagination({ count, selectedIndex, style }: PaginationProps) {
  const { styles } = useStyles(stylesheet);
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 18,
      stiffness: 200,
    });
  });
  return (
    <View style={[styles.paginationContainer, style]}>
      <PaginationIndicator animation={animation} />
      {[...Array(count).keys()].map(index => (
        <Dot key={`dot-${index}`} index={index} animation={animation} />
      ))}
    </View>
  );
}

const stylesheet = createStyleSheet(mainTheme => ({
  paginationContainer: {
    flexDirection: 'row',
  },
  dotContainer: {
    width: mainTheme.spacing[6],
    height: mainTheme.spacing[6],
    borderRadius: mainTheme.spacing[6],
    backgroundColor: mainTheme.colors.primary,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  dotWrapper: {
    width: mainTheme.spacing[6],
    aspectRatio: 1,
    borderRadius: mainTheme.spacing[6],
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: mainTheme.colors.typography.PRIMARY[200],
    width: mainTheme.spacing[6] / 3,
    aspectRatio: 1,
    borderRadius: mainTheme.spacing[6] / 3,
  },
}));
