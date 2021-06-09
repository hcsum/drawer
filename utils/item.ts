import { PRESET_LABEL, TItem } from '../contexts/ItemsTypeDef';

export function getNewItem(): TItem {
  return {
    name: '',
    note: '',
    amount: 1,
    img: undefined,
    label: PRESET_LABEL.NOT_LABELED,
    dateAcquired: new Date().toISOString(),
    dateLastUsed: new Date().toISOString(),
    id: new Date().getTime().toString(),
  };
}
