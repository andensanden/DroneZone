import React, { createContext, useState, useContext } from 'react';

const FixedNodesContext = createContext();

export function FixedNodesProvider({ children }) {
    const [fixedNodes, setFixedNodes] = useState([]);

    return (
        <FixedNodesContext.Provider value={{ fixedNodes, setFixedNodes }}>
          {children}
        </FixedNodesContext.Provider>
      );
}

export const useFixedNodes = () => useContext(FixedNodesContext);