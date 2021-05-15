import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { getData, storeData } from '../utils/Storage';

const MOCK_DATA: TItem[] = [
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
];

export type TItem = {
  name: string;
  note?: string;
  amount: number;
  img: string | undefined;
  label: string;
  dateLastUsed?: number;
  dateAcquired: string;
  id: string;
};

type TItemsContext = [TItem[], React.Dispatch<React.SetStateAction<TItem[]>>];

const ItemsContext = React.createContext<TItemsContext | undefined>(undefined);

function useItems() {
  const context = React.useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used within a ItemsProvider');

  const [items, setItems] = context;

  const labelsWithTotal = useMemo(() => {
    const map = items.reduce((accu, item) => {
      if (!accu[item.label]) accu[item.label] = 1;
      else accu[item.label]++;

      return accu;
    }, {} as { [key: string]: number });

    return Object.entries(map);
  }, [items]);

  const getItemsByLabel = (label: string) => items.filter((item) => item.label === label);

  const total = useMemo(() => labelsWithTotal.reduce((accu, label) => (accu += label[1]), 0), [
    labelsWithTotal,
  ]); // what is this for? total items?

  return {
    items,
    labelsWithTotal,
    setItems,
    total,
    getItemsByLabel,
  };
}

function ItemsProvider(props: any) {
  const [items, setItems] = useState([]);
  const value = useMemo(() => [items, setItems], [items]);

  useEffect(() => {
    storeData(JSON.stringify(MOCK_DATA))
      .then(getData)
      .then((data) => data && setItems(JSON.parse(data)));
  }, []);

  return <ItemsContext.Provider value={value} {...props} />;
}

export { ItemsProvider, useItems };
