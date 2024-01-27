type Command = {
  command: string;
};

export default function sendCommand(command: string): void {
  fetch("/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command } as Command),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .catch((error) => console.error("Error:", error));
}
