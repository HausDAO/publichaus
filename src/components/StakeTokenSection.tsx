import { TARGET_DAO } from '../targetDAO';
import { Button, Checkbox, Input, Label, ParSm } from '@daohaus/ui';
import { useEffect, useState } from 'react';
import { isNumberish, toBaseUnits } from '@daohaus/utils';
import styled from 'styled-components';

export const StakeTokenSection = ({
  isApproved,
  handleApprove,
  isLoading,
  handleStake,
  balance,
}: {
  isLoading: boolean;
  isApproved: boolean;
  balance?: string | null;
  handleApprove: () => void;
  handleStake: (wholeAmt: string) => void;
}) => {
  const [stkAmt, setStkAmt] = useState<string>('');
  const [valMsg, setValMsg] = useState<string | null>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!stkAmt) {
      setValMsg(null);
    } else if (!isNumberish(stkAmt)) {
      setValMsg('Please enter a valid number');
    } else if (!balance) {
      setValMsg(`You do not have a ${TARGET_DAO.STAKE_TOKEN_SYMBOL} balance`);
    } else if (
      Number(balance) <
      Number(toBaseUnits(stkAmt, TARGET_DAO.STAKE_TOKEN_DECIMALS))
    ) {
      setValMsg(`Insufficient ${TARGET_DAO.STAKE_TOKEN_SYMBOL} balance`);
    } else {
      setValMsg(null);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleLocalStake = () => {
    handleStake(stkAmt);
  };
  const toggleChecked = () => {
    setIsChecked(!isChecked);
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
      {isApproved && (
        <CheckArea>
          <Checkbox
            onCheckedChange={toggleChecked}
            checked={isChecked}
            defaultChecked={false}
            title="I have read the DAOhaus Manifesto"
            className="checkbox"
          />
        </CheckArea>
      )}

      {isApproved ? (
        <Button
          type="button"
          onClick={handleLocalStake}
          fullWidth
          disabled={isLoading || !isChecked || !!valMsg}
        >
          Stake {TARGET_DAO.STAKE_TOKEN_SYMBOL}
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
const CheckArea = styled.div`
  button {
    transform: translateY(-1rem);
  }
  svg {
    transform: translateY(1rem);
  }
`;
