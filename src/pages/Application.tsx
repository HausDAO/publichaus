import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { TXBuilder } from '@daohaus/tx-builder';

import { FORM } from '../legos/forms';

export const Application = () => {
  const { provider, address } = useDHConnect();

  return (
    <TXBuilder
      provider={provider}
      chainId="0x5"
      daoId="0xc035dd7cda32ae73f0f306ed56658527aad47648"
      safeId="0x36824793440d1ab326b9b5634418393d5f5e30a3"
      appState={{
        memberAddress: address,
      }}
    >
      <FormBuilder form={FORM.VERIFY_DELEGATE} targetNetwork="0x5" />
    </TXBuilder>
  );
};
