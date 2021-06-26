import * as React from 'react';
import { useEffect, useMemo, useReducer } from 'react';
import { getData, storeData } from '../utils/Storage';
import { MOCK_DATA, PRESET_LABEL, TItem, TItemsAction } from './ItemsTypeDef';

function itemsReducer(state: TItem[], action: TItemsAction) {
  switch (action.type) {
    case 'SET': {
      return action.payload;
    }
    case 'ADD': {
      return [...state, action.payload];
    }
    case 'UPDATE': {
      const { payload } = action;

      // it turns out: you need to rebuild the array by removing the old item and adding it again.
      // https://stackoverflow.com/questions/57719325/how-to-update-an-array-within-object-with-usereducer
      // otherwise strange things happen, like an extra item appears with identical properties
      const arr = [...state];
      const idx = arr.findIndex((item) => item.id === payload.id);
      if (idx >= 0) arr.splice(idx, 1, payload);

      return arr;
    }
    case 'REMOVE': {
      const { payload: id } = action;

      const arr = [...state];
      const idx = arr.findIndex((item) => item.id === id);
      if (idx >= 0) arr.splice(idx, 1);

      return arr;
    }
  }
}

type TItemsContext = [TItem[], React.Dispatch<TItemsAction>];

const ItemsContext = React.createContext<TItemsContext | undefined>(undefined);

function useItems() {
  const context = React.useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used within a ItemsProvider');

  const [items, dispatch] = context;

  const itemsToKeep = items.filter(
    (item) => item.label !== PRESET_LABEL.TO_BE_REMOVED
  );

  const itemsToBeRemoved = items
    .filter((item) => item.label === PRESET_LABEL.TO_BE_REMOVED)
    .sort(
      (item1, item2) =>
        new Date(item1.dateLastUsed as string).getTime() -
        new Date(item2.dateLastUsed as string).getTime()
    );

  const labelsWithTotal = useMemo(() => {
    const map = itemsToKeep.reduce((accu, item) => {
      if (!accu[item.label]) accu[item.label] = 1;
      else accu[item.label]++;

      return accu;
    }, {} as { [key: string]: number });

    return Object.entries(map);
  }, [items]);

  const getItemsByLabel = (label: string | null) => {
    if (label) return itemsToKeep.filter((item) => item.label === label);
    return itemsToKeep;
  };

  const searchForItems = (keyword: string) => {
    const result = items.filter((item) =>
      JSON.stringify(item).includes(keyword)
    );
    return result;
  };

  const getItemByID = (id: string) => items.filter((item) => item.id === id)[0];
  const setItems = (list: TItem[]) => dispatch({ type: 'SET', payload: list });
  const addItem = (item: TItem) => dispatch({ type: 'ADD', payload: item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE', payload: id });
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
    removeItem,
    searchForItems,
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
