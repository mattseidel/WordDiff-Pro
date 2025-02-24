import { NavigationService } from "../../application/NavigationService";

export function initializeNavigation(): void {
  const segment = document.getElementById("navSegment");

  if (segment) {
    segment.addEventListener("ionChange", (event: Event) => {
      const customEvent = event as CustomEvent;
      const selectedPage = customEvent.detail.value;
      NavigationService.changeSegment(selectedPage);
      
    });
  } else {
    console.warn("No se encontró el segmento de navegación.");
  }
}
