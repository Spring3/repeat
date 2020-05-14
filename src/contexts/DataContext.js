import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

const useDataContext = () => {
  const [data, setData] = useState([]);

  return {
    data,
    setData
  };
}

const DataContextProvider = ({ children }) => {
  const context = useDataContext();

  return (
    <DataContext.Provider value={context}>
      { children }
    </DataContext.Provider>
  )
};

const useData = () => useContext(DataContext);


export {
  DataContext,
  DataContextProvider,
  useData
}
