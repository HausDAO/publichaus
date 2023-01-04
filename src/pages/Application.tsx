import { FormBuilder } from '@daohaus/form-builder';

import { FORM } from '../legos/forms';

export const Application = () => {
  return <FormBuilder form={FORM.VERIFY_DELEGATE} targetNetwork="0x5" />;
};
