import { useRef, useState } from 'react';
import { Pressable, StyleProp, TextInput, View, ViewStyle } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '#components/atoms';
import { isStringEmpty } from '#utils';

interface Props {
  length: number;
  code: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange: (value: string) => void;
}

export default function OneTimeCodeInput({
  length,
  code,
  disabled = false,
  onChange,
  style,
}: Props) {
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const newArray = new Array(length).fill(0);
  const { styles, theme } = useStyles(stylesheet);

  const renderBoxes = () => {
    const boxArray = newArray.map((item, idx) => {
      let borderColor: string;
      const digit = code[idx] || '';

      const isCurrentDigit = idx === code.length;
      const isLastDigit = idx === length - 1;
      const isCodeFull = code.length === length;

      const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

      if ((isFocused && isContainerFocused) || !isStringEmpty(digit))
        borderColor = theme.colors.primary;
      else if (disabled) borderColor = theme.colors.primaryLighter;
      else borderColor = theme.colors.primaryLighter;

      return (
        <View
          key={idx}
          style={[
            styles.box(isLastDigit),
            {
              borderColor,
            },
          ]}>
          <Text style={styles.digit}>{digit}</Text>
        </View>
      );
    });
    return boxArray;
  };

  const handlePress = () => {
    setIsContainerFocused(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => setIsContainerFocused(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.pressable} onPress={handlePress} disabled={disabled}>
        <View style={styles.boxes}>{renderBoxes()}</View>
      </Pressable>
      <TextInput
        ref={inputRef}
        keyboardType="number-pad"
        value={code}
        onChangeText={onChange}
        onBlur={handleBlur}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={length}
        style={styles.input}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  box: (isLastDigit: boolean) => ({
    flex: 1,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: theme.spacing[2],
    marginRight: isLastDigit ? theme.spacing[0] : theme.spacing[2],
    justifyContent: 'center',
    alignItems: 'center',
  }),
  pressable: {
    flex: 1,
  },
  digit: {
    fontSize: theme.fontSizes['2xl'],
    color: theme.colors.typography.PRIMARY[800],
  },
  boxes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: 50,
    opacity: 0,
    backgroundColor: 'transparent',
  },
}));
