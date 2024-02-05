import type { APIRoute } from "astro";
import { buttonPress } from "../../backend/tamaButton";

// opt out of prerendering
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const command = data.command;
  console.log(`Command received: ${command}`);

  if (
    typeof command === "string" &&
    (command === "A" || command === "B" || command === "C")
  ) {
    buttonPress(command);
  }

  return new Response(JSON.stringify({ receivedCommand: command }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
