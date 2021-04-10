import React, { createContext, useContext, useState } from 'react';

interface StatusBarContextData {
  color: string
  setColor: (color: string) => void
}

const StatusBarContext = createContext<StatusBarContextData>({} as StatusBarContextData);

export const StatusBarProvider: React.FC = ({ children }) => {
  const [color, setColor] = useState<string>('#fff');

  return (
    <StatusBarContext.Provider value={{
      color,
      setColor,
    }}
    >
      {children}
    </StatusBarContext.Provider>
  );
};

export const useStatusBar = (): StatusBarContextData => {
  const context = useContext(StatusBarContext);

  return context;
};
