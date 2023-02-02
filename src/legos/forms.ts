import { FormLego } from '@daohaus/form-builder';
import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TX } from './tx';

export const FORM: Record<string, CustomFormLego> = {
  VERIFY_DELEGATE: {
    id: 'VERIFY_DELEGATE',
    title: 'Verify Champion',
    subtitle: 'Verification Proposal',
    description: 'Verify yourself as a DAO Champion',
    requiredFields: { name: true, description: true, link: true },
    log: true,
    tx: TX.VERIFY_DELEGATE,
    fields: [
      FIELD.NAME,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      // {
      //   id: 'segment',
      //   type: 'formSegment',
      //   title: 'User Data',
      //   fields: [
      //     {
      //       ...FIELD.DESCRIPTION,
      //       id: 'delegateDescription',
      //       label: 'User Description',
      //     },
      //     { ...FIELD.LINK, id: 'delegateLink' },
      //   ],
      // },
    ],
  },
};
