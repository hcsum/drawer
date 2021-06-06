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
    case 'UPDATE': {
      const { id } = action.payload;

      // let's try if directly mutating the item object without updating it in the array works
      // it works...
      const item = state.find((it) => it.id === id);

      if (item) Object.assign(item, action.payload);

      // so even the obj is the same, returning a new array is enough to tirgger a rerender?
      return [...state];
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
  const itemsToKeep = items.filter((item) => !item.isToBeRemoved);

  const labelsWithTotal = useMemo(() => {
    const map = itemsToKeep.reduce((accu, item) => {
      if (!accu[item.label]) accu[item.label] = 1;
      else accu[item.label]++;

      return accu;
    }, {} as { [key: string]: number });

    return Object.entries(map);
  }, [items]);

  const itemsToBeRemoved = items.filter((item) => item.isToBeRemoved);

  // ------------ methods ---------------
  const getItemsByLabel = (label: string | null) => {
    if (label) return items.filter((item) => item.label === label);
    return items;
  };

  const getItemByID = (id: string) => items.filter((item) => item.id === id)[0];
  const setItems = (list: TItem[]) => dispatch({ type: 'SET', payload: list });
  const addItem = (item: TItem) => dispatch({ type: 'ADD', payload: item });
  const updateItem = (item: TItem) =>
    dispatch({ type: 'UPDATE', payload: item });

  return {
    items: itemsToKeep,
    labelsWithTotal,
    itemsToBeRemoved,
    getItemsByLabel,
    getItemByID,
    setItems,
    addItem,
    updateItem,
  };
}

function ItemsProvider(props: any) {
  const [items, dispatch] = useReducer(itemsReducer, []);
  const value = useMemo(() => [items, dispatch], [items]);

  useEffect(() => {
    storeData(JSON.stringify(MOCK_DATA))
      .then(getData)
      .then(
        (data) => data && dispatch({ type: 'SET', payload: JSON.parse(data) })
      );
  }, []);

  return <ItemsContext.Provider value={value} {...props} />;
}

export { ItemsProvider, useItems };
