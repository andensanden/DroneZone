import React, { createContext, useState, useContext } from "react";

const NodesContext = createContext();

export function NodesProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const clearNodes = () => {
    setNodes([]);
  };

  return (
    <NodesContext.Provider value={{ nodes, setNodes, clearNodes }}>
      {children}
    </NodesContext.Provider>
  );
}

export const useNodes = () => useContext(NodesContext);
