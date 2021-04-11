import * as React from 'react';
const CountContext = React.createContext<CountContext | undefined>(undefined);

type CountContext = [number, React.Dispatch<React.SetStateAction<number>>];

function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  const [count, setCount] = context;
  const increment = () => setCount((c) => c + 1);
  return {
    count,
    setCount,
    increment,
  };
}

function CountProvider(props: any) {
  const [count, setCount] = React.useState(0);
  const value = React.useMemo(() => [count, setCount], [count]);
  return <CountContext.Provider value={value} {...props} />;
}

export { CountProvider, useCount };
