import makeDraggable from "./makeDraggable";
import sendCommand from "./sendCommand";

export default function initializeTama(): void {
  const tamaContainer = document.querySelector(".tama-container");

  if (tamaContainer instanceof HTMLElement) {
    makeDraggable(tamaContainer);
  } else {
    console.error("tamaContainer is not an HTMLElement");
  }

  // Attach click event listeners to buttons
  document
    .getElementById("btnA")
    ?.addEventListener("click", () => sendCommand("A"));
  document
    .getElementById("btnB")
    ?.addEventListener("click", () => sendCommand("B"));
  document
    .getElementById("btnC")
    ?.addEventListener("click", () => sendCommand("C"));
}
