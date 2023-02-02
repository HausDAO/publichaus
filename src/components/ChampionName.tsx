import { useFormBuilder } from '@daohaus/form-builder';
import { Buildable, Field, WrappedInput } from '@daohaus/ui';
import React, { useEffect } from 'react';

export const ChampionName = (props: Buildable<Field>) => {
  const { id } = props;
  const { watch, setValue } = useFormBuilder();
  const name = watch(id);
  useEffect(() => {
    const template = `${name} | Championship Request`;
    setValue('championName', template);
  }, [name]);

  return <WrappedInput {...props} />;
};
