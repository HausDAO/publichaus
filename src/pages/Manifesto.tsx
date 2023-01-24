import { Bold, H2, ParMd, SingleColumnLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { MANIFESTO } from '../targetDAO';

const ContentBox = styled.div`
  h2 {
    margin-bottom: 4rem;
  }
  max-width: 70rem;
  p {
    margin-bottom: 2rem;
  }
`;

export const Manifesto = () => {
  return (
    <SingleColumnLayout>
      <ContentBox>
        <H2>{MANIFESTO.title}</H2>
        {MANIFESTO.sections.map((section) => {
          return (
            <ParMd key={section.bold}>
              <Bold>{section.bold}</Bold> {section.text}
            </ParMd>
          );
        })}
      </ContentBox>
    </SingleColumnLayout>
  );
};
