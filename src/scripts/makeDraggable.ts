export default function makeDraggable(element: HTMLElement): void {
  let posX: number = 0,
    posY: number = 0,
    posInitial: number = 0,
    posFinal: number = 0;

  // Mouse Events
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    posInitial = e.clientX;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    // Calculate the new cursor position:
    posX = posInitial - e.clientX;
    posInitial = e.clientX;
    posY = posFinal - e.clientY;
    posFinal = e.clientY;
    // Set the element's new position:
    element.style.top = element.offsetTop - posY + "px";
    element.style.left = element.offsetLeft - posX + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
