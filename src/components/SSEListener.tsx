import React, { createContext, useEffect, useState } from "react";

const SSEContext = createContext<string | null | undefined>(undefined);

export const SSEListener = ({
  children,
  endpoint,
}: {
  children: React.ReactNode;
  endpoint: string;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    eventSource.onmessage = (event) => {
      const message: string = JSON.parse(event.data);
      console.log(`Message Received: ${message}`);
      setMessage(message);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [endpoint]);

  return <SSEContext.Provider value={message}>{children}</SSEContext.Provider>;
};

export const useSSEListener = () => {
  const context = React.useContext(SSEContext);

  if (context === undefined) {
    throw new Error("useSSEListener must be used within a SSEListener");
  }

  return context;
};
