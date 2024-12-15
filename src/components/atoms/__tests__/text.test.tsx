import React from 'react';

import { render } from '@testing-library/react-native';

import Text from '#/components/atoms/text';

describe('Text Component', () => {
  it('should render the text passed as children', () => {
    const { getByText } = render(<Text>Test Text</Text>);

    expect(getByText('Test Text')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(<Text style={customStyle}>Styled Text</Text>);
    const textElement = getByText('Styled Text');

    expect(textElement.props.style).toContainEqual(customStyle);
  });

  it('should merge default and custom styles', () => {
    const customStyle = { fontSize: 24 };
    const { getByText } = render(<Text style={customStyle}>Merged Styles</Text>);
    const textElement = getByText('Merged Styles');

    expect(textElement.props.style).toEqual(expect.arrayContaining([customStyle]));
  });

  it('should match the snapshot', () => {
    const tree = render(<Text>Snapshot Test</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('throws error when no children are passed', () => {
    expect(() => render(<Text />)).toThrow('Text component requires children');
  });
});
