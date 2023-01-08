import { TARGET_DAO } from '../targetDAO';
import { Button, Input, Label, ParSm } from '@daohaus/ui';
import { useEffect, useState } from 'react';
import { isNumberish } from '@daohaus/utils';

export const StakeTokenSection = ({
  isApproved,
  handleApprove,
  isLoading,
  handleStake,
}: {
  isLoading: boolean;
  isApproved: boolean;
  handleApprove: () => void;
  handleStake: (wholeAmt: string) => void;
}) => {
  const [stkAmt, setStkAmt] = useState<string>('');
  const [valMsg, setValMsg] = useState<string | null>();

  useEffect(() => {
    if (isNumberish(stkAmt) || !stkAmt) {
      setValMsg(null);
    } else {
      setValMsg('Please enter a valid number');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleLocalStake = () => {
    handleStake(stkAmt);
  };

  return (
    <>
      <div className="input-box">
        <Label>
          <>
            {isApproved ? 'Stake' : 'Approve'} {TARGET_DAO.STAKE_TOKEN_SYMBOL}{' '}
            to Join
          </>
        </Label>
        <Input
          id="stkAmt"
          onChange={handleChange}
          number
          //@ts-ignore
          value={stkAmt}
          disabled={!isApproved || isLoading}
          full
          placeholder={isApproved ? '0' : 'Approve first'}
        />
        {valMsg && <ParSm className="err">{valMsg}</ParSm>}
      </div>
      {isApproved ? (
        <Button
          type="button"
          onClick={handleLocalStake}
          fullWidth
          disabled={isLoading}
        >
          Stake
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleApprove}
          variant="outline"
          fullWidth
          disabled={isLoading}
        >
          Approve {TARGET_DAO.STAKE_TOKEN_SYMBOL}
        </Button>
      )}
    </>
  );
};
