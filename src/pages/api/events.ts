import type { APIRoute } from "astro";
import { randomUUID } from "crypto";

let clients: {
  id: string;
  controller: ReadableStreamDefaultController;
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
      clients.push({ id: clientId, controller });

      const keepAliveInterval = setInterval(() => {
        const keepAliveMessage = new TextEncoder().encode(":keepalive\n\n");
        controller.enqueue(keepAliveMessage);
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

export function broadcastMessage(message: string) {
  clients.forEach((client) => {
    const messageBuffer = new TextEncoder().encode(
      `data: ${JSON.stringify(message)}\n\n`
    );
    client.controller.enqueue(messageBuffer);
  });
}
