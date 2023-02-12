import { ListMembersQuery } from '@daohaus/moloch-v3-data';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { AccountProfile } from '@daohaus/utils';

export type DelegateData = {
  credentialIdentifier: string;
  title: string;
  daoId: string;
  description: string;
  link: string;
  longDescription: string;
  recipientAddress: string;
  table: string;
  createdAt?: string;
};
export type Member = ListMembersQuery['members'][0];
export type RegisteredMember = Member & { records: DelegateData[] } & {
  profile: AccountProfile;
};
export type RegisteredMembers = Record<string, RegisteredMember>;
export type MemberWithProfile = MolochV3Member & { profile: AccountProfile };
