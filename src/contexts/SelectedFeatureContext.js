import React, { createContext, useContext, useState } from 'react';

const SelectedFeatureContext = createContext();

export const useSelectedFeatureContext = () => useContext(SelectedFeatureContext);


export const SelectedFeatureProvider = ({ children }) => {
  const [country, setCountry] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [waterType, setWaterType] = useState('');




  return (
    <SelectedFeatureContext.Provider value={{ country, setCountry, tradeType, setTradeType, waterType, setWaterType }}>
      {children}
    </SelectedFeatureContext.Provider>
  );
};
