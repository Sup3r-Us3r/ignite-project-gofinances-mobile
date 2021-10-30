import React from 'react';
import { TextInputProps } from 'react-native';

import { FormInput } from './styles';

interface InputProps extends TextInputProps {
  active?: boolean;
}

export const Input = ({
  active = false,
  ...rest
}: InputProps) => {
  return (
    <FormInput
      active={active}
      {...rest}
    />
  );
};
