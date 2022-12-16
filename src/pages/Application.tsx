import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { TXBuilder } from '@daohaus/tx-builder';

import { FORM } from '../legos/forms';
import { TARGET_DAO } from '../targetDAO';

export const Application = () => {
  const { provider, address } = useDHConnect();

  return (
    <TXBuilder
      provider={provider}
      chainId={TARGET_DAO.CHAIN_ID}
      daoId={TARGET_DAO.ADDRESS}
      safeId={TARGET_DAO.SAFE_ADDRESS}
      appState={{
        memberAddress: address,
      }}
    >
      <FormBuilder form={FORM.VERIFY_DELEGATE} targetNetwork="0x5" />
    </TXBuilder>
  );
};
