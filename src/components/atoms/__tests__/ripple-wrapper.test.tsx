import React from 'react';
import { View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import RippleWrapper from '#/components/atoms/ripple-wrapper';

// TODO: implement gesture tests later with react-native-gesture-handler's synthetic event system
describe('RippleWrapper Component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <RippleWrapper onPress={() => {}} testID="test">
        <View />
      </RippleWrapper>
    );
    expect(getByTestId('test')).toBeTruthy();
  });

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <RippleWrapper onPress={onPressMock} disabled={true} testID="test">
        <View />
      </RippleWrapper>
    );
    const pressableArea = getByTestId('test');

    fireEvent.press(pressableArea);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
