import React from 'react';

import { render } from '@testing-library/react-native';

import Image from '#/components/atoms/image';

const HERO_IMAGE = require('#assets/images/logoPortal.png');

describe('Image component', () => {
  it('renders correctly without calculating aspect ratio', () => {
    const { getByTestId } = render(<Image source={HERO_IMAGE} testID="image" />);

    const image = getByTestId('image');
    expect(image.props.style).toEqual(expect.not.objectContaining({ aspectRatio: 2 }));
  });

  it('calculates and applies aspect ratio when calculateAspectRatio is true', () => {
    const { getByTestId } = render(
      <Image source={HERO_IMAGE} calculateAspectRatio testID="image" />
    );

    const image = getByTestId('image');
    expect(image.props.style).toEqual(expect.objectContaining({ aspectRatio: 1 }));
  });

  it('does not apply aspect ratio when calculateAspectRatio is false', () => {
    const { getByTestId } = render(
      <Image source={HERO_IMAGE} calculateAspectRatio={false} testID="image" />
    );

    const image = getByTestId('image');
    expect(image.props.style).toEqual(expect.not.objectContaining({ aspectRatio: 2 }));
  });

  it('applies additional styles correctly', () => {
    const customStyle = { width: 100, height: 50 };
    const { getByTestId } = render(
      <Image source={HERO_IMAGE} calculateAspectRatio style={customStyle} testID="image" />
    );

    const image = getByTestId('image');
    expect(image.props.style).toEqual(
      expect.objectContaining({
        aspectRatio: 1,
        width: 100,
        height: 50,
      })
    );
  });
});
