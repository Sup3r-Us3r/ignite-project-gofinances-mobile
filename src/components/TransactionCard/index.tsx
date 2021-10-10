import React from 'react';
import { categories } from '../../utils/categories';

import {
  Wrapper,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardDataProps {
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardDataProps;
};

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const [ category ] = categories.filter(item => item.key === data.category);

  return (
    <Wrapper>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'down' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Wrapper>
  );
};
