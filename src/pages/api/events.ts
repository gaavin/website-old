import type { APIRoute } from "astro";
import { randomUUID } from "crypto";

// opt out of prerendering
export const prerender = false;

let clients: {
  id: string;
  controller: ReadableStreamDefaultController;
  isActive: boolean;
}[] = [];

export const GET: APIRoute = async ({ request }) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const stream = new ReadableStream({
    start(controller) {
      const clientId = randomUUID();
      clients.push({ id: clientId, controller, isActive: true });

      const keepAliveInterval = setInterval(() => {
        const keepAliveMessage = new TextEncoder().encode(":keepalive\n\n");
        controller.enqueue(keepAliveMessage);
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAliveInterval);
        const clientIndex = clients.findIndex(
          (client) => client.id === clientId
        );
        if (clientIndex !== -1) {
          clients[clientIndex].isActive = false; // Set isActive flag to false
          clients.splice(clientIndex, 1);
        }
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
};

export function broadcastMessage(message: string) {
  clients.forEach((client) => {
    if (client.isActive) {
      // Check if the client is active
      const messageBuffer = new TextEncoder().encode(
        `data: ${JSON.stringify(message)}\n\n`
      );
      try {
        client.controller.enqueue(messageBuffer);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ERR_INVALID_STATE") {
          // Handle the case where the stream is closed unexpectedly
          client.isActive = false;
        } else {
          throw error; // Re-throw the error if it's not related to invalid state
        }
      }
    }
  });
}
