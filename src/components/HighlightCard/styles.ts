import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down' | 'total';
};

export const Wrapper = styled.SafeAreaView<TypeProps>`
  width: ${RFValue(300)}px;
  background: ${({ theme, type }) => type === 'total'
    ? theme.colors.secondary
    : theme.colors.shape
  };
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) => type === 'total'
    ? theme.colors.shape
    : theme.colors.textDark
  };
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ theme, type }) => type === 'up' && css`
    color: ${theme.colors.success};
  `};

  ${({ theme, type }) => type === 'down' && css`
    color: ${theme.colors.attention};
  `};

  ${({ theme, type }) => type === 'total' && css`
    color: ${theme.colors.shape};
  `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => type === 'total'
    ? theme.colors.shape
    : theme.colors.textDark
  };
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => type === 'total'
    ? theme.colors.shape
    : theme.colors.text
  };
`;
