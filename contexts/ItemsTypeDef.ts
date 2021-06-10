export enum PRESET_LABEL {
  TO_BE_REMOVED = 'To be removed',
  NOT_LABELED = 'Not labeled',
}

export enum PROBATION_PERIOD {
  THREE_MONTH = 3,
  SIX_MONTH = 6,
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
  img: string | undefined;
  label: string | PRESET_LABEL;
  dateAcquired: string | undefined;
  dateLastUsed: string | undefined;
  probationPeriod: PROBATION_PERIOD | undefined;
};

export type TItemsAction = ActionSet | ActionAdd | ActionUpdate;

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

const MOCK_DATA_CLEAR: TItem[] = [
  {
    name: 'Badminton racket',
    note: '',
    amount: 1,
    img: undefined,
    dateAcquired: undefined,
    dateLastUsed: '2021-01-30',
    probationPeriod: undefined,
    id: '297656556',
    label: PRESET_LABEL.TO_BE_REMOVED,
  },
  {
    name: 'ugly sport shirt',
    note: '',
    amount: 1,
    img: undefined,
    dateAcquired: undefined,
    dateLastUsed: '2021-01-30',
    probationPeriod: undefined,
    id: '297656999',
    label: PRESET_LABEL.TO_BE_REMOVED,
  },
  {
    name: 'some old shoes',
    note: '',
    amount: 1,
    img: undefined,
    dateAcquired: undefined,
    dateLastUsed: '2021-01-30',
    probationPeriod: undefined,
    id: '197656559',
    label: PRESET_LABEL.TO_BE_REMOVED,
  },
];

export const MOCK_DATA: TItem[] = [
  {
    name: 'Respberry Pi',
    note: 'My mini computer',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAcquired: '2021-01-30',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656556',
  },
  {
    name: 'Keydrous keyboard',
    note: 'Awesome 60% mechanical keyboard!! so sao!!',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAcquired: '2021-03-16',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656588',
  },
  {
    name: 'Thin sport coat',
    note: 'love it so much, so useful',
    amount: 1,
    img: undefined,
    label: 'Wardrobe',
    dateAcquired: '2021-04-05',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656558',
  },
  {
    name: 'Socks',
    note: 'socks and floor',
    amount: 6,
    img: undefined,
    label: 'Wardrobe',
    dateAcquired: '2021-04-05',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656555',
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
    name: 'Starbuck cup',
    note: 'my cup!',
    amount: 1,
    img: undefined,
    label: 'Daily',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '897656590',
  },
  {
    name: 'Keychron K3',
    note: 'so low so nice',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAcquired: '2020-08-20',
    dateLastUsed: undefined,
    probationPeriod: undefined,
    id: '891156590',
  },
  {
    name: 'Glasses',
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
