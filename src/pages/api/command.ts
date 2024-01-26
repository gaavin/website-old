import type { APIRoute } from "astro";
import { broadcastMessage } from "./events"; // Import the broadcastMessage function

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const command = data.command;
  console.log(`Command received: ${command}`);

  // Broadcast the received command to all connected clients
  broadcastMessage(`Button ${command} was pressed`);

  return new Response(JSON.stringify({ receivedCommand: command }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
