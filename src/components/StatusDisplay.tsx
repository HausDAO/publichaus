import { H2, ParMd, SingleColumnLayout, Spinner } from '@daohaus/ui';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .spacer {
    margin-bottom: '2rem';
  }
`;

export const StatusDisplay = ({
  title,
  status,
  description,
  element,
  spinner,
}: {
  title?: string;
  status?: string;
  description?: string;
  element?: ReactNode;
  spinner?: boolean;
}) => {
  return (
    <SingleColumnLayout title={title}>
      <DisplayBox>
        {status && <H2 className="spacer">{status}</H2>}
        {description && <ParMd className="spacer">{description}</ParMd>}
        {spinner && <Spinner size="12rem" />}
        {element}
      </DisplayBox>
    </SingleColumnLayout>
  );
};
