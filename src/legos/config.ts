import { CoreFieldLookup } from '@daohaus/form-builder';
import { FieldLegoBase, FormLegoBase } from '@daohaus/utils';
import { ChampionName } from '../components/ChampionName';

export const CustomFields = {
  ...CoreFieldLookup,
  championName: ChampionName,
};
export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
