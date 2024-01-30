import { useState, useEffect } from "react";
import { sendCommand } from "./sendCommand";
import { useSSEListener } from "../SSEListener";

export const TamaButton = ({ command }: { command: "A" | "B" | "C" }) => {
  const [isPressed, setIsPressed] = useState(false);
  const message = useSSEListener();

  useEffect(() => {
    if (message === `${command}-press`) {
      setIsPressed(true);
    }
    if (message === `${command}-release`) {
      setIsPressed(false);
    }
  }, [message, command]);

  const handleClick = () => {
    console.log(`Client pressed ${command}`);
    sendCommand(command);
  };

  return (
    <button
      className={`tama-button ${isPressed ? "pressed" : ""}`}
      onClick={handleClick}
    >
      {command}
    </button>
  );
};
