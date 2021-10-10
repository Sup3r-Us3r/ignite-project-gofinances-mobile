import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryProps {
  isActive: boolean;
}

export const Wrapper = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  justify-content: flex-end;
  align-items: center;
  height: ${RFValue(113)}px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
} as TouchableOpacityProps)<CategoryProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${RFValue(15)}px;
  background: ${({ isActive, theme }) => isActive
    ? theme.colors.secondaryLight
    : theme.colors.background
  };
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.textDark};
  margin-right: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
