import React from 'react';

import { render } from '@testing-library/react-native';

import Svg from '#/components/atoms/svg';
import { ChevronRight as MockIcon } from '#assets/svg';

describe('Svg Component', () => {
  it('should render the Svg component with default props', () => {
    const { getByTestId } = render(<Svg Icon={MockIcon} testID="svg-container" />);
    const svgContainer = getByTestId('svg-container');

    expect(svgContainer).toBeTruthy();
  });

  it('should pass stroke and fill props to the Svg Icon component', () => {
    const stroke = '#ff0000';
    const fill = '#00ff00';

    const { getByTestId } = render(
      <Svg Icon={MockIcon} stroke={stroke} fill={fill} testID="svg-container" />
    );

    const svgIcon = getByTestId('svg-container').findByType(MockIcon);

    expect(svgIcon.props.stroke).toBe(stroke);
    expect(svgIcon.props.fill).toBe(fill);
  });

  it('should apply additional View props', () => {
    const style = { backgroundColor: 'blue' };

    const { getByTestId } = render(<Svg Icon={MockIcon} style={style} testID="svg-container" />);

    const svgContainer = getByTestId('svg-container');
    expect(svgContainer.props.style).toMatchObject(style);
  });

  it('should match the snapshot', () => {
    const stroke = '#ff0000';
    const fill = '#00ff00';

    const { toJSON } = render(<Svg Icon={MockIcon} stroke={stroke} fill={fill} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
