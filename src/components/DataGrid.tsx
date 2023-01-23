import { widthQuery } from '@daohaus/ui';
import styled from 'styled-components';

export const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* justify-content: space-between; */
  padding: 2rem 0;
  div {
    margin-bottom: 2rem;
    margin-right: 4rem;
    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;
