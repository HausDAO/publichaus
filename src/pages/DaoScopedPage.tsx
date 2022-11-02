import { FormBuilder } from '@daohaus/form-builder';
import React from 'react';
import { FORM } from '../assets/forms';

export const DaoScopedPage = () => {
  return <FormBuilder form={FORM.SIGNAL} />;
};
