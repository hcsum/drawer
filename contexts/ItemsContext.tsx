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
    dateAdded: '2021-01-30',
    id: '897656556',
  },
  {
    name: 'Durgod keyboard',
    note: 'Awesome 78-key mechanical keyboard',
    amount: 1,
    img: undefined,
    label: 'Gadget',
    dateAdded: '2021-03-16',
    id: '897656588',
  },
  {
    name: 'Thin sport coat',
    note: 'love it so much, so useful',
    amount: 1,
    img: undefined,
    label: 'Wardrobe',
    dateAdded: '2021-04-05',
    id: '897656558',
  },
  {
    name: 'Tennis racket',
    note: 'Oh tennis',
    amount: 1,
    img: undefined,
    label: 'Sport',
    dateAdded: '2020-08-20',
    id: '897656511',
  },
];

export type TItem = {
  name: string;
  note?: string;
  amount: number;
  img: string | undefined;
  label: string;
  deadline?: number;
  dateAdded: string;
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
