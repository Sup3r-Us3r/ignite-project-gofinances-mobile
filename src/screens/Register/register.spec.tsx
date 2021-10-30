import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import { Register } from '.';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  );
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-gesture-handler');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('Register Screen', () => {
  it('should be open category modal when user click on button', async () => {
    const { getByTestId } = render(
      <Register />,
      { wrapper: Providers },
    );

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    }, { timeout: 3000 })
  });
});
