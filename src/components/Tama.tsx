import { useContext } from "react";
import { SSEContext } from "./SSEClient";

const sendCommand = (command: string) => {
  fetch("/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.error("Error:", error));
};

const TamaButton = ({ command }: { command: string }) => {
  const onClickHandler = () => {
    sendCommand(command);
    console.log(`Sent: ${command}`);
  };
  return <button onClick={onClickHandler} />;
};

export const Tama = () => {
  const messages = useContext(SSEContext);
  return (
    <div>
      <TamaButton command={"A"} />
      <TamaButton command={"B"} />
      <TamaButton command={"C"} />
    </div>
  );
};
