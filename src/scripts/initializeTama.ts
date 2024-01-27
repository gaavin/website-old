import makeDraggable from "./makeDraggable";
import sendCommand from "./sendCommand";

export default function initializeTama(): void {
  // Wait for the DOM content to be fully loaded
  window.addEventListener("DOMContentLoaded", () => {
    const tamaContainer = document.getElementById("tama-container");

    // Initialize the draggable functionality
    if (tamaContainer) {
      makeDraggable(tamaContainer);
    }

    document
      .getElementById("btnA")
      ?.addEventListener("click", () => sendCommand("A"));
    document
      .getElementById("btnB")
      ?.addEventListener("click", () => sendCommand("B"));
    document
      .getElementById("btnC")
      ?.addEventListener("click", () => sendCommand("C"));
  });
}
