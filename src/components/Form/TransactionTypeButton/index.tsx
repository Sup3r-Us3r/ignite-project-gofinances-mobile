import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface TransactionTypeButton extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
};

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButton) => {
  return (
    <Container
      type={type}
      isActive={isActive}
      {...rest}
    >
      <Icon
        type={type}
        name={icons[type]}
      />

      <Title>{title}</Title>
    </Container>
  );
};
