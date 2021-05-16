import * as React from 'react';
import { useEffect, useMemo, useReducer } from 'react';
import { getData, storeData } from '../utils/Storage';
import { MOCK_DATA, TItem, TItemsAction } from './ItemsTypeDef';

function itemsReducer(state: TItem[], action: TItemsAction) {
  switch (action.type) {
    case 'SET': {
      return action.payload;
    }
    case 'ADD': {
      return [...state, action.payload];
    }
  }
}

type TItemsContext = [TItem[], React.Dispatch<TItemsAction>];

const ItemsContext = React.createContext<TItemsContext | undefined>(undefined);

function useItems() {
  const context = React.useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used within a ItemsProvider');

  const [items, dispatch] = context;

  // ------------ states ---------------
  const labelsWithTotal = useMemo(() => {
    const map = items.reduce((accu, item) => {
      if (!accu[item.label]) accu[item.label] = 1;
      else accu[item.label]++;

      return accu;
    }, {} as { [key: string]: number });

    return Object.entries(map);
  }, [items]);

  // ------------ methods ---------------
  const getItemsByLabel = (label: string) => items.filter((item) => item.label === label);

  const setItems = (list: TItem[]) => dispatch({ type: 'SET', payload: list });

  return {
    items,
    labelsWithTotal,
    setItems,
    getItemsByLabel,
  };
}

function ItemsProvider(props: any) {
  const [items, dispatch] = useReducer(itemsReducer, []);
  const value = useMemo(() => [items, dispatch], [items]);

  useEffect(() => {
    storeData(JSON.stringify(MOCK_DATA))
      .then(getData)
      .then((data) => data && dispatch({ type: 'SET', payload: JSON.parse(data) }));
  }, []);

  return <ItemsContext.Provider value={value} {...props} />;
}

export { ItemsProvider, useItems };
