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

export function getLastUseSince(date: string) {
  const now = new Date().getTime();
  const lastUsedAt = new Date(date).getTime();

  const gap = now - lastUsedAt;

  const gapInDay = gap / 1000 / 60 / 60 / 24;

  if (Math.ceil(gapInDay) < 7) return Math.ceil(gapInDay) + ' days ago';

  const gapInWeek = gapInDay / 7;

  if (Math.ceil(gapInWeek) <= 6) return Math.ceil(gapInWeek) + ' weeks ago';

  const gapInMonth = gapInWeek / 4;

  if (Math.ceil(gapInMonth) < 12) return Math.ceil(gapInMonth) + ' months ago';

  const gapInYear = gapInMonth / 12;

  return Math.ceil(gapInYear) + ' years ago';
}

export function checkIsExpired(
  lastDateUsed: string,
  probationPeriod: PROBATION_PERIOD
) {
  const now = new Date().getTime();
  return now - new Date(lastDateUsed).getTime() > probationPeriod;
}
