import React, { useState } from 'react';
import {
  Keyboard,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { CategorySelect } from '../CategorySelect';

import {
  Wrapper,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório'),
  amount: Yup.number()
    .required('Preço é obrigatório')
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo'),
});

export const Register = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [transactionType, setTransactionType] = useState<string>('');
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setTimeout(() => {
      setCategoryModalOpen(true);
    }, 1000);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert(
        'Selecione o tipo da transação',
        'Necessário a seleção do tipo da transação para continuar.',
      );
    }

    if (category.key === 'category') {
      return Alert.alert(
        'Selecione a categoria',
        'Necessário a seleção da categoria para continuar',
      );
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;

      const allTransactionsSaved = await AsyncStorage.getItem(dataKey);
      const transactionsData = allTransactionsSaved ? JSON.parse(allTransactionsSaved) : [];

      const dataFormatted = [
        ...transactionsData,
        newTransaction,
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('List' as any);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao salvar', 'Não foi possível salvar o registro.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name['message']}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount['message']}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                isActive={transactionType === 'up'}
                onPress={() => handleTransactionsTypeSelect('up')}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                isActive={transactionType === 'down'}
                onPress={() => handleTransactionsTypeSelect('down')}
              />
            </TransactionTypes>

            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal
          testID="modal-category"
          visible={categoryModalOpen}
        >
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
