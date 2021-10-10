import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  height: ${RFValue(56)}px;
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
