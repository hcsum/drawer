export type TItem = {
  name: string;
  note: string;
  amount: number;
  img: string | undefined;
  label: string;
  dateAcquired?: string;
  dateLastUsed?: string;
  isToBeRemoved?: boolean;
  id: string;
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

export const MOCK_DATA_CLEAR: TItem[] = [
  {
    name: 'Badminton racket',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '897656556',
    isToBeRemoved: true,
    label: '',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '897656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '197656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '297656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '397656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '497656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '597656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '697656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '797656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '897656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '997656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '097656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '117656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '127656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '137656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '147656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '157656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '167656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '177656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '187656559',
  },
  {
    name: 'some shoes',
    isToBeRemoved: true,
    label: '',
    note: '',
    amount: 1,
    img: undefined,
    dateLastUsed: '2021-01-30',
    id: '197656559',
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
    id: '897656556',
  },
  {
    name: 'Keydrous keyboard',
    note: 'Awesome 60% mechanical keyboard!! so sao!!',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAcquired: '2021-03-16',
    id: '897656588',
  },
  {
    name: 'Thin sport coat',
    note: 'love it so much, so useful',
    amount: 1,
    img: undefined,
    label: 'Wardrobe',
    dateAcquired: '2021-04-05',
    id: '897656558',
  },
  {
    name: 'Socks',
    note: 'socks and floor',
    amount: 6,
    img: undefined,
    label: 'Wardrobe',
    dateAcquired: '2021-04-05',
    id: '897656555',
  },
  {
    name: 'Tennis racket',
    note: 'Oh tennis',
    amount: 1,
    img: undefined,
    label: 'Sport',
    dateAcquired: '2020-08-20',
    id: '897656511',
  },
  {
    name: 'Starbuck cup',
    note: 'my cup!',
    amount: 1,
    img: undefined,
    label: 'Daily',
    dateAcquired: '2020-08-20',
    id: '897656590',
  },
  {
    name: 'Keychron K3',
    note: 'so low so nice',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAcquired: '2020-08-20',
    id: '891156590',
  },
  {
    name: 'Glasses',
    note: 'i need to see',
    amount: 1,
    img: undefined,
    label: 'Daily',
    dateAcquired: '2020-08-20',
    id: '891156090',
  },
  ...MOCK_DATA_CLEAR,
];
