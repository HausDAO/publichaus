import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { FormLayout, Link, ParMd, Spinner } from '@daohaus/ui';
import { useState } from 'react';
import { useUserMember } from '../hooks/useUserMember';
import { CustomFields } from '../legos/config';

import { FORM } from '../legos/forms';
import { TARGET_DAO } from '../targetDAO';

enum PageState {
  Idle = 'Idle',
  Success = 'Success',
  Error = 'Error',
}

export const Application = () => {
  const { address } = useDHConnect();
  const { isMember, isLoading, error } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address,
  });
  const [pageState, setPageState] = useState(PageState.Idle);

  if (isLoading) {
    return (
      <FormLayout title="Loading">
        <Spinner size="12rem" />
      </FormLayout>
    );
  }
  if (error) {
    return (
      <FormLayout title="Error">
        <ParMd>{error.message}</ParMd>
      </FormLayout>
    );
  }
  if (!isMember) {
    return (
      <FormLayout title="Not a member">
        <ParMd style={{ marginBottom: '1rem' }}>
          You are not a member of this DAO.
        </ParMd>
        <Link href="/join"> Please join the DAO first.</Link>
      </FormLayout>
    );
  }

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
        customFields={CustomFields}
        lifeCycleFns={{
          onPollSuccess() {
            setPageState(PageState.Success);
          },
          onTxError() {
            setPageState(PageState.Error);
          },
          onPollError() {
            setPageState(PageState.Error);
          },
        }}
      />
    );
  }
  return null;
};
