import { CustomFieldLego } from './config';

export const FIELD: Record<string, CustomFieldLego> = {
  NAME: {
    id: 'name',
    type: 'championName',
    label: 'Champion Name',
    placeholder: 'Enter name',
  },
  DESCRIPTION: {
    id: 'description',
    type: 'textarea',
    label: 'Brief Platform Description',
    placeholder: 'Enter description',
    helperText:
      'A succinct discription of your platform that gets across your purpose at a glance',
  },
  LINK: {
    id: 'link',
    type: 'input',
    label: 'Full Platform Link',
    placeholder: 'http://',
    expectType: 'url',
    helperText: 'Please provide a link to your detailed Championship platform',
  },
};
