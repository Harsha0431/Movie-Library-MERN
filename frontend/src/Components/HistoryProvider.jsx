import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (history.length == 0) {
      history.push(location.pathname);
      setHistory(history);
    }
    else if(history.length>0 && history[history.length-1]!=location.pathname)
      setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryPaths = () => useContext(HistoryContext);
