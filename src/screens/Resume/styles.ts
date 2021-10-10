import styled from 'styled-components/native';
import { ScrollViewProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Wrapper = styled.SafeAreaView`
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
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)`
  flex: 1;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const ChartContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
