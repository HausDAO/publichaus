import { Avatar, border, Card } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';

const DelegateCardBox = styled(Card)`
  .top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4rem;
    p {
      margin-bottom: 0.6rem;
    }
  }
`;

export const DelegateCard = () => {
  return (
    <DelegateCardBox>
      <div className="top-box">
        <Avatar />
      </div>
    </DelegateCardBox>
  );
};
