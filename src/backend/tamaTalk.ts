// opt out of prerendering
export const prerender = false;

export async function tamaTalk(command: string) {
  const serverUrl = "http://192.168.2.63:5000/listen";

  // Validate the command before sending
  if (!["A", "B", "C"].includes(command)) {
    console.error("Invalid command. Command must be one of A, B, or C.");
    return;
  }

  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from server:", errorData.error);
      return;
    }

    // Handle the successful response
    const data = await response.json();
    console.log("Success:", data.message);
  } catch (error) {
    console.error("Error sending command to tama:", error);
  }
}
