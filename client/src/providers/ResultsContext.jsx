import { createContext, useContext } from 'react';

const ResultsContext = createContext(null);

export const ResultsProvider = ({ children, results }) => {
  return (
    <ResultsContext.Provider value={results}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};