import { CameraCapturedPicture } from 'expo-camera';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export enum PRESET_LABEL {
  TO_BE_REMOVED = 'To be removed',
  NOT_LABELED = 'Not labeled',
}

export enum PROBATION_PERIOD {
  THREE_MONTH = 3 * 1000 * 60 * 60 * 24 * 30,
  SIX_MONTH = 6 * 1000 * 60 * 60 * 24 * 30,
}

export const PROBATION_PERIOD_OPTIONS = [
  { value: PROBATION_PERIOD.THREE_MONTH, label: '3 months' },
  { value: PROBATION_PERIOD.SIX_MONTH, label: '6 months' },
];

export type TItem = {
  id: string;
  name: string;
  note: string;
  amount: number;
  img: CameraCapturedPicture | ImageInfo | undefined;
  label: string | PRESET_LABEL;
  dateAcquired: string | undefined;
  dateLastUsed: string | undefined;
  probationPeriod: PROBATION_PERIOD | undefined;
};

export type TItemsAction = ActionSet | ActionAdd | ActionUpdate | ActionRemove;

type ActionSet = {
  type: 'SET';
  payload: TItem[];
};

type ActionAdd = {
  type: 'ADD';
  payload: TItem;
};

type ActionUpdate = {
  type: 'UPDATE';
  payload: TItem;
};

type ActionRemove = {
  type: 'REMOVE';
  payload: string; // item id
};

const MOCK_DATA_CLEAR: TItem[] = [
  {
    name: 'My ugly sport shirt',
    note: '',
    amount: 1,
    img: undefined,
    dateAcquired: undefined,
    dateLastUsed: '2020-06-30',
    probationPeriod: PROBATION_PERIOD.THREE_MONTH,
    id: '297656999',
    label: PRESET_LABEL.TO_BE_REMOVED,
  },
  {
    name: 'some shoes',
    note: '',
    amount: 3,
    img: undefined,
    dateAcquired: undefined,
    dateLastUsed: '2021-04-10',
    probationPeriod: PROBATION_PERIOD.THREE_MONTH,
    id: '197656559',
    label: PRESET_LABEL.TO_BE_REMOVED,
  },
];

export interface ISearchQuery {
  keyword?: string;
  label?: string;
}

export const MOCK_DATA: TItem[] = [
  {
    name: 'Keydous NJ68',
    note: 'My favorite',
    amount: 1,
    img: undefined,
    label: 'Keyboards',
    dateAcquired: '2021-01-30',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656556',
  },
  {
    name: 'Melgeek 64',
    note: 'Awesome 60% mechanical keyboard!! so cool!!',
    amount: 1,
    img: undefined,
    label: 'Keyboards',
    dateAcquired: '2021-03-16',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656588',
  },
  {
    name: 'Keychron K7',
    note: 'so low so nice',
    amount: 1,
    img: undefined,
    label: 'Keyboards',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '891156590',
  },
  {
    name: 'Melgeek Z70',
    note: 'I thought its was good.',
    amount: 1,
    img: undefined,
    label: 'Keyboards',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '891156590',
  },
  {
    name: 'Tennis racket',
    note: 'Oh tennis',
    amount: 1,
    img: undefined,
    label: 'Sport',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656511',
  },
  {
    name: 'A pair of glasses',
    note: 'i need to see',
    amount: 1,
    img: undefined,
    label: 'Daily',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '891156090',
  },
  ...MOCK_DATA_CLEAR,
];
