import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import TextInput from '#/components/atoms/text-input';
import { ChevronRight } from '#assets/svg';

jest.useFakeTimers();

describe('TextInput Component', () => {
  it('renders the input and floating label correctly', () => {
    const { getByTestId } = render(
      <TextInput testID="text-input" label="Username" placeholder="Enter username" value="" />
    );

    const input = getByTestId('text-input');

    const label = getByTestId('floating-label');

    expect(input).toBeTruthy();

    expect(label).toBeTruthy();
  });

  it('animates floating label on focus', () => {
    const animatedLabelWrapperStyle = [{ translateY: -24 }, { translateX: -5 }, { scale: 0.85 }];

    const { getByTestId } = render(
      <TextInput testID="text-input" label="Username" placeholder="Enter username" value="" />
    );

    const input = getByTestId('text-input');

    const labelWrapper = getByTestId('floating-label-wrapper');

    fireEvent(input, 'focus');

    jest.advanceTimersByTime(200);

    expect(labelWrapper).toHaveAnimatedStyle({
      transform: animatedLabelWrapperStyle,
    });
  });

  it('animates floating label back on blur', () => {
    const initialLabelWrapperStyle = [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }];

    const { getByTestId } = render(
      <TextInput testID="text-input" label="Username" placeholder="Enter username" value="" />
    );

    const input = getByTestId('text-input');

    const labelWrapper = getByTestId('floating-label-wrapper');

    fireEvent(input, 'focus');

    jest.advanceTimersByTime(200);

    fireEvent(input, 'blur');

    jest.advanceTimersByTime(200);

    expect(labelWrapper).toHaveAnimatedStyle({
      transform: initialLabelWrapperStyle,
    });
  });

  it('changes border color on focus', () => {
    const focusedBorderColor = 'rgba(18, 96, 240, 1)';

    const unfocusedBorderColor = '#737373';

    const { getByTestId } = render(
      <TextInput testID="text-input" label="Username" placeholder="Enter username" value="" />
    );

    const input = getByTestId('text-input');

    expect(input.props.style.borderColor).toBe(unfocusedBorderColor);

    fireEvent(input, 'focus');

    jest.advanceTimersByTime(200);

    expect(input).toHaveAnimatedStyle({ borderColor: focusedBorderColor });
  });

  it('calls onChangeText when input value changes', () => {
    const handleChangeText = jest.fn();

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        onChangeText={handleChangeText}
      />
    );

    const input = getByTestId('text-input');

    fireEvent.changeText(input, 'New Value');

    expect(handleChangeText).toHaveBeenCalledWith('New Value');
  });

  it('calls onFocus and onBlur when appropriate', () => {
    const handleFocus = jest.fn();

    const handleBlur = jest.fn();

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const input = getByTestId('text-input');

    fireEvent(input, 'focus');

    expect(handleFocus).toHaveBeenCalled();

    fireEvent(input, 'blur');

    expect(handleBlur).toHaveBeenCalled();
  });

  it('merges custom textStyle with default label styles', () => {
    const customTextStyle: StyleProp<TextStyle> = { fontWeight: 'bold' };

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        textStyle={customTextStyle}
      />
    );

    const label = getByTestId('floating-label');

    const labelStyles = label.props.style;

    expect(labelStyles).toEqual(expect.arrayContaining([expect.objectContaining(customTextStyle)]));

    expect(labelStyles).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: expect.anything() })])
    );
  });

  it('throws an error if label is not provided', () => {
    expect(() => render(<TextInput placeholder="Enter username" value="" />)).toThrow(
      "The 'label' prop is required for the TextInput component."
    );
  });

  it('renders the LeftIcon when provided', () => {
    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        LeftIcon={ChevronRight}
      />
    );

    const leftIcon = getByTestId('input-left-icon');

    expect(leftIcon).toBeTruthy();
  });

  it('renders the RightIcon when provided', () => {
    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        RightIcon={ChevronRight}
      />
    );

    const rightIcon = getByTestId('input-right-icon');

    expect(rightIcon).toBeTruthy();
  });

  it('renders both LeftIcon and RightIcon when both are provided', () => {
    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        LeftIcon={ChevronRight}
        RightIcon={ChevronRight}
      />
    );

    const leftIcon = getByTestId('input-left-icon');

    const rightIcon = getByTestId('input-right-icon');

    expect(leftIcon).toBeTruthy();

    expect(rightIcon).toBeTruthy();
  });

  it('does not render LeftIcon or RightIcon when not provided', () => {
    const { queryByTestId } = render(
      <TextInput testID="text-input" label="Username" placeholder="Enter username" value="" />
    );

    const leftIcon = queryByTestId('input-left-icon');

    const rightIcon = queryByTestId('input-right-icon');

    expect(leftIcon).toBeNull();

    expect(rightIcon).toBeNull();
  });

  it('renders with danger border color when hasError is true', () => {
    const errorBorderColor = '#EC4E50';

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        hasError={true}
      />
    );

    const input = getByTestId('text-input');

    expect(input).toHaveAnimatedStyle({ borderColor: errorBorderColor });
  });

  it('does not apply danger border color when hasError is false', () => {
    const unfocusedBorderColor = '#737373';

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        hasError={false}
      />
    );

    const input = getByTestId('text-input');

    expect(input).toHaveAnimatedStyle({ borderColor: unfocusedBorderColor });
  });

  it('applies danger label color when hasError is true', () => {
    const errorLabelColor = '#EC4E50';

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        hasError={true}
      />
    );

    const label = getByTestId('floating-label');

    expect(label).toHaveAnimatedStyle({ color: errorLabelColor });
  });

  it('does not apply danger label color when hasError is false', () => {
    const normalLabelColor = '#404040';

    const { getByTestId } = render(
      <TextInput
        testID="text-input"
        label="Username"
        placeholder="Enter username"
        value=""
        hasError={false}
      />
    );

    const label = getByTestId('floating-label');

    expect(label).toHaveAnimatedStyle({ color: normalLabelColor });
  });
});
