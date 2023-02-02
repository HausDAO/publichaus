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
    label: 'Platform Description',
    placeholder: 'Enter description',
    helperText: 'Enter a brief description of your platform.',
  },
  LINK: {
    id: 'link',
    type: 'input',
    label: 'Full platoform link',
    placeholder: 'http://',
    expectType: 'url',
    helperText: 'Please provide a detailed link to your Championship platform',
  },
};
