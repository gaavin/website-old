import type { APIRoute } from "astro";
import { broadcastMessage } from "./events";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const command = data.command;
  console.log(`Command received: ${command}`);

  broadcastMessage(`Button ${command} was pressed`);

  return new Response(JSON.stringify({ receivedCommand: command }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
