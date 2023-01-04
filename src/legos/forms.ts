import { FormLego } from '@daohaus/form-builder';
import { FIELD } from './fields';
import { TX } from './tx';

export const FORM: Record<string, FormLego> = {
  VERIFY_DELEGATE: {
    id: 'VERIFY_DELEGATE',
    title: 'Verify Delegate',
    subtitle: 'Verification Proposal',
    description: 'Verify yourself as a DAO Delegate',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.VERIFY_DELEGATE,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'segment',
        type: 'formSegment',
        title: 'User Data',
        fields: [
          {
            ...FIELD.DESCRIPTION,
            id: 'delegateDescription',
            label: 'User Description',
          },
          { ...FIELD.LINK, id: 'delegateLink' },
        ],
      },
    ],
  },
};
