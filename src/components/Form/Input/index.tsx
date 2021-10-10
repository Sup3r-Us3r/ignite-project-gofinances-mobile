import React from 'react';
import { TextInputProps } from 'react-native';

import { FormInput } from './styles';

export const Input = ({ ...rest }: TextInputProps) => {
  return (
    <FormInput {...rest} />
  );
};
