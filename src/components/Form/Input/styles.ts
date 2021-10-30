import styled, { css } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../../global/styles/theme';

interface FormInputProps {
  active: boolean;
}

export const FormInput = styled(TextInput).attrs({
  placeholderTextColor: theme.colors.text,
} as TextInputProps)<FormInputProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  width: 100%;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 16px 18px;
  margin-bottom: 8px;

  ${({ active, theme }) => active && css`
    border-width: 3px;
    border-color: ${theme.colors.attention};
  `};
`;
