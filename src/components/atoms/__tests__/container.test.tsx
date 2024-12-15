import React from 'react';
import { ViewStyle } from 'react-native';

import { render } from '@testing-library/react-native';

import Container from '#/components/atoms/container';
import Text from '#/components/atoms/text';

describe('Container component', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Container>
        <Text>Test Child</Text>
      </Container>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it('should apply the default styles from the stylesheet', () => {
    const { getByTestId } = render(
      <Container>
        <Text>Test Child</Text>
      </Container>
    );

    const container = getByTestId('container');

    expect(container.props.style).toContainEqual({
      paddingHorizontal: 16,
    });
  });

  it('should apply custom styles passed in through props', () => {
    const customStyle: ViewStyle = {
      backgroundColor: 'red',
    };

    const { getByTestId } = render(
      <Container style={customStyle}>
        <Text>Test Child</Text>
      </Container>
    );

    const container = getByTestId('container');

    expect(container.props.style).toContainEqual(customStyle);
  });

  it('should pass other ViewProps to the View', () => {
    const { getByLabelText } = render(
      <Container accessibilityLabel="custom container">
        <Text>Test Child</Text>
      </Container>
    );

    // Ensure the accessibilityLabel prop is passed to the View
    expect(getByLabelText('custom container')).toBeTruthy();
  });

  it('should merge default and custom styles', () => {
    const customStyle: ViewStyle = {
      backgroundColor: 'blue',
    };

    const { getByTestId } = render(
      <Container style={customStyle}>
        <Text>Test Child</Text>
      </Container>
    );

    const container = getByTestId('container');

    // Ensure both default and custom styles are applied
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ paddingHorizontal: 16 }, { backgroundColor: 'blue' }])
    );
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <Container>
        <Text>Test Child</Text>
      </Container>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with no children', () => {
    const { toJSON } = render(<Container />);

    expect(toJSON()).toBeTruthy();
  });
});
