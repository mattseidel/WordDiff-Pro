import { NodeTransformer } from "../domain/NodeTransformer";

export class EditorService {
  // Devuelve el HTML transformado del contenido del editor
  static getFinalText(contentElement: HTMLElement | null): string {
    if (!contentElement) return "";
    return Array.from(contentElement.childNodes)
      .map(NodeTransformer.transformNode)
      .join("");
  }
}
