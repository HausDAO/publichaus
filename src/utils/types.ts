import { ListMembersQuery } from '@daohaus/moloch-v3-data';

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
export type RegisteredMember = Member & { records: DelegateData[] };
export type RegisteredMembers = Record<string, RegisteredMember>;
