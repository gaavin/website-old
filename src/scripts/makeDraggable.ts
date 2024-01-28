// src/scripts/makeDraggable.ts

export default function makeDraggable(element: HTMLElement): void {
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let origX = 0;
  let origY = 0;
  let deltaX = 0;
  let deltaY = 0;

  element.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    origX = element.offsetLeft;
    origY = element.offsetTop;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    element.style.cursor = "grabbing";
  });

  function onMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    deltaX = event.clientX - dragStartX;
    deltaY = event.clientY - dragStartY;

    element.style.left = origX + deltaX + "px";
    element.style.top = origY + deltaY + "px";
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    element.style.cursor = "grab";
  }

  // Prevent the default drag behavior of image and link elements
  element.ondragstart = () => false;
}
