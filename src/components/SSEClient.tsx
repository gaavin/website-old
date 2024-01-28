import React, {
  useEffect,
  useState,
  createContext,
  useReducer,
  useContext,
} from "react";

interface SSEListenerProps {
  endpoint: string;
}

interface SSEContextInterface {
  endpoint: string;
}

export const SSEContext = createContext(() => {});

export const SSEListener: React.FC<
  React.PropsWithChildren<SSEListenerProps>
> = ({ children, endpoint }) => {
  const reducer = useContext(SSEContext);
  const [message, setMessage] = useState();
  const [state, dispatch] = useReducer(reducer, message);

  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessage(message);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <SSEContext.Provider value={messages}>{children}</SSEContext.Provider>;
};
