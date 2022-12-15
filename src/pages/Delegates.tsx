import { useRecords } from '../hooks/useRecord';
import { DELEGATE_TABLE_REF } from '../legos/tx';

export const Delegates = () => {
  const { isLoading, records } = useRecords({
    daoId: '0xc035dd7cda32ae73f0f306ed56658527aad47648',
    chainId: '0x5',
    recordType: 'credential',
    credentialType: DELEGATE_TABLE_REF,
  });

  console.log('records', records);

  return <div>Delegates</div>;
};
