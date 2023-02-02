import { DelegateData } from './types';

export const isDelegateData = (
  parsedContent: any
): parsedContent is DelegateData => {
  return (
    parsedContent &&
    parsedContent.credentialIdentifier &&
    parsedContent.title &&
    parsedContent.daoId &&
    parsedContent.description &&
    parsedContent.link != null &&
    parsedContent.recipientAddress &&
    parsedContent.table
  );
};
