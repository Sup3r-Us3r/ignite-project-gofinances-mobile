import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const Profile = () => {
  return (
    <View>
      <Text testID="text-title">
        Perfil
      </Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Name"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Surname"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  );
};
