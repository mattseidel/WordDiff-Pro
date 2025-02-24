import { DiffService } from "../application/DiffService";

export class DiffAdapter {
  private container: HTMLElement;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    
    if (!container) throw new Error(`No se encontró el contenedor con ID ${containerId}`);
    this.container = container;
  }

  // Renderiza las diferencias en el contenedor
  renderDiffs(original: any, current: any) {
    const diffs = DiffService.getDiffs(original, current);
    this.container.innerHTML = DiffService.generateDiffHtml(diffs);
  }
}
