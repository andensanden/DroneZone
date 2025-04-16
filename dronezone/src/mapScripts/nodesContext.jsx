import React, { createContext, useState, useContext } from "react";

const NodesContext = createContext();

export function NodesProvider({ children }) {
  const [nodes, setNodes] = useState([]);

  return (
    <NodesContext.Provider value={{ nodes, setNodes }}>
      {children}
    </NodesContext.Provider>
  );
}

export const useNodes = () => useContext(NodesContext);
