import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { FormLayout, Link, ParMd, Spinner } from '@daohaus/ui';
import { useState } from 'react';
import { useUserMember } from '../hooks/useUserMember';

import { FORM } from '../legos/forms';
import { TARGET_DAO } from '../targetDAO';

enum PageState {
  Idle = 'Idle',
  Success = 'Success',
  Error = 'Error',
}

export const Application = () => {
  const [pageState, setPageState] = useState(PageState.Idle);

  if (pageState === PageState.Success) {
    return (
      <FormLayout title="Success!">
        <ParMd style={{ marginBottom: '1rem' }}>
          Your verification Proposal is ready for voting
        </ParMd>
        <Link
          href={`https://admin.daohaus.fun/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/proposals`}
          linkType="external"
        >
          Click here to see your proposal
        </Link>
      </FormLayout>
    );
  }
  if (pageState === PageState.Error) {
    return (
      <FormLayout title="Error!">
        <ParMd>Something went wrong. Please try again.</ParMd>
      </FormLayout>
    );
  }
  if (pageState === PageState.Idle) {
    return (
      <FormBuilder
        form={FORM.VERIFY_DELEGATE}
        targetNetwork={TARGET_DAO.CHAIN_ID}
        onSuccess={() => setPageState(PageState.Success)}
        onError={() => setPageState(PageState.Error)}
      />
    );
  }
  return null;
};
