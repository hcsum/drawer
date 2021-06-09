import {
  PRESET_LABEL,
  PROBATION_PERIOD,
  TItem,
} from '../contexts/ItemsTypeDef';

export function getNewItem(): TItem {
  return {
    name: '',
    note: '',
    amount: 1,
    img: undefined,
    label: PRESET_LABEL.NOT_LABELED,
    dateAcquired: new Date().toISOString(),
    dateLastUsed: new Date().toISOString(),
    probationPeriod: PROBATION_PERIOD.SIX_MONTH,
    id: new Date().getTime().toString(),
  };
}
