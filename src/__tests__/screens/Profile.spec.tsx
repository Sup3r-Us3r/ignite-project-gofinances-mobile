import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
  it('should have correctly placeholder in user name input', () => {
    const { debug, getByText, getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(getByText('Perfil'));
    expect(inputName.props.placeholder).toBeTruthy();
    expect(inputName).toBeTruthy();
  });

  it('should be load user data', () => {
    const { getByTestId } = render(<Profile />);

    const nameInput = getByTestId('input-name');
    const surnameInput = getByTestId('input-surname');

    expect(nameInput.props.value).toEqual('Name');
    expect(surnameInput.props.value).toEqual('Surname');
  });

  it('should exists title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
