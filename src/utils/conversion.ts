export const sharesDelegatedToMember = (
  delegateShares: string | number,
  memberShares: string | number
) => {
  const val = Number(delegateShares) - Number(memberShares);
  if (!Number.isSafeInteger(val)) return BigInt(val).toString();
  return val.toString();
};
