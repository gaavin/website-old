// src/pages/api/events.ts
import type { APIRoute } from "astro";

let clients: { id: number; controller: ReadableStreamDefaultController }[] = [];

export const GET: APIRoute = async ({ request }) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const stream = new ReadableStream({
    start(controller) {
      const clientId = Date.now();
      clients.push({ id: clientId, controller });

      // Send a keep-alive comment to avoid timeout
      const keepAliveInterval = setInterval(() => {
        controller.enqueue(":keepalive\n\n");
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAliveInterval);
        clients = clients.filter((client) => client.id !== clientId);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
};

// Function to broadcast a message to all clients
export function broadcastMessage(message: string) {
  clients.forEach(({ controller }) => {
    controller.enqueue(`data: ${JSON.stringify(message)}\n\n`);
  });
}
