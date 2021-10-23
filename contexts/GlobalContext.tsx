import * as React from 'react';
import { useState } from 'react';

type TGlobalState = {
  activeTab: 'Keep' | 'Clear';
};

type TGlobalContext = [
  TGlobalState,
  React.Dispatch<React.SetStateAction<TGlobalState | undefined>>
];

const GlobalContext = React.createContext<TGlobalContext | undefined>(
  undefined
);

function GlobalStateProvider(props: any) {
  const [globalState, setGlobalState] = useState<TGlobalState>();

  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]} {...props} />
  );
}

function useGlobalState() {
  const context = React.useContext(GlobalContext);
  if (!context)
    throw new Error('useItems must be used within a GlobalStateProvider');

  const [globalState, setGlobalState] = context;

  return { globalState, setGlobalState };
}

export { GlobalStateProvider, useGlobalState };
