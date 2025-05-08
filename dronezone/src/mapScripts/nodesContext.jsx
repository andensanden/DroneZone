import React, { createContext, useState, useContext } from "react";

// Creates the DronepathsContext to share state across components.
const NodesContext = createContext();

/**
 * Provider component to manage and share nodes state.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components
 * @returns {JSX.Element} The provider component
 *
 * This component provides a context for managing nodes state in the application.
 * It allows child components to access and modify the nodes state.
 *
 * @example
 * <NodesProvider>
 *   <ChildComponent />
 * </NodesProvider>
 *
 * In this example, `ChildComponent` can access the nodes state and functions
Provider component to manage and share nodes state.

*/
export function NodesProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const clearNodes = () => {
    setNodes([]);
  };
  // Adds a new node to the state.
  return (
    <NodesContext.Provider value={{ nodes, setNodes, clearNodes }}>
      {children}
    </NodesContext.Provider>
  );
}

export const useNodes = () => useContext(NodesContext);
