import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardDataProps } from '../../components/TransactionCard';
import { useAuth } from '../../contexts/AuthContext';

import theme from '../../global/styles/theme';

import {
  Wrapper,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardDataProps {
  id: string;
};

interface HighlightProps {
  amount: string;
  lastTransactions: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const { user, signOut } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'up' | 'down'
  ) {
    const collectionFiltered = collection
      .filter(transaction => transaction.type === type);

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collectionFiltered
          .map(transaction => new Date(transaction.date).getTime())
      ),
    );

    return `${lastTransactions.getDate()} de ${
      lastTransactions.toLocaleString('pt-BR', { month: 'long' })
    }`;
  }

  async function loadTransactions() {
    setIsLoading(true);

    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsResponse = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactionsResponse
      .map((item: DataListProps) => {
        if (item.type === 'up') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
          minimumFractionDigits: 2,
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          type: item.type,
          name: item.name,
          amount,
          category: item.category,
          date,
        };
      });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactionsResponse, 'up');
    const lastTransactionExpensives = getLastTransactionDate(transactionsResponse, 'down');
    const totalInterval = lastTransactionExpensives === 0
      ? 'Não há transações'
      : `01 a ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactions: lastTransactionEntries === 0
          ? 'Não há transações'
          :`Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactions: lastTransactionExpensives === 0
          ? 'Não há transações'
          : `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransactions: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Wrapper>
      {
        isLoading ? (
          <LoadContainer>
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
            />
          </LoadContainer>
        )
        : (
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: user.photo }} />

                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData?.entries?.amount}
                lastTransaction={highlightData?.entries?.lastTransactions}
              />
              <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData?.expensives?.amount}
                lastTransaction={highlightData?.expensives?.lastTransactions}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData?.total?.lastTransactions}
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TransactionCard data={item} />
                )}
              />
            </Transactions>
          </>
        )
      }
    </Wrapper>
  );
}
