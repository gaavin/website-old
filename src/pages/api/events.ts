import type { APIRoute } from "astro";
import { randomUUID } from "crypto";

// opt out of prerendering
export const prerender = false;

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
        // Send keep-alive message only if the client is still connected
        if (clients.some((client) => client.id === clientId)) {
          const keepAliveMessage = new TextEncoder().encode(":keepalive\n\n");
          controller.enqueue(keepAliveMessage);
        } else {
          clearInterval(keepAliveInterval); // Clear interval if client is not found
        }
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAliveInterval); // Clear interval when client disconnects
        clients = clients.filter((client) => client.id !== clientId); // Remove client from the list
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
    try {
      client.controller.enqueue(messageBuffer);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "TypeError" &&
        error.message.includes("Controller is already closed")
      ) {
        // Handle the specific case where the stream is closed unexpectedly
        // Remove the client from the clients array as the stream is closed
        clients = clients.filter((c) => c.id !== client.id);
      } else {
        // Re-throw the error if it's not the specific 'Controller is already closed' error
        throw error;
      }
    }
  });
}
