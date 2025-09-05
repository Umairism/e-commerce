import React, { createContext, useContext } from 'react';

const BasenameContext = createContext(null);

export const useBasename = () => useContext(BasenameContext);

export const BasenameProvider = ({ children, basename }) => (
  <BasenameContext.Provider value={{ basename }}>
    {children}
  </BasenameContext.Provider>
);
