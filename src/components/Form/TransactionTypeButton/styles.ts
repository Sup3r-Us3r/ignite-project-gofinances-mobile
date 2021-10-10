import styled, { css } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
};

interface IconsProps {
  type: 'up' | 'down';
};

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
} as TouchableOpacityProps)<ContainerProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 48%;
  padding: 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ type, isActive, theme }) => type === 'up' && isActive && css`
    border: 1.5px solid transparent;
    background: ${theme.colors.successLight};
  `};

  ${({ type, isActive, theme }) => type === 'down' && isActive && css`
    border: 1.5px solid transparent;
    background: ${theme.colors.attentionLight};
  `};
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ type, theme }) => type === 'up'
    ? theme.colors.success
    : theme.colors.attention
  };
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
