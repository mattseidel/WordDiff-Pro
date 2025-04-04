import Quill, { Delta } from "quill";

export class QuillHandler {
  constructor(private quill: Quill) {}

  setContent(content: string): void {
    try {
      const parsedContent = JSON.parse(content);
      if (Array.isArray(parsedContent.ops)) {
        this.quill.setContents(parsedContent);
      } else {
        console.warn("Contenido inválido: No es un Delta válido.");
      }
    } catch (error) {
      console.error("Error al parsear el contenido:", error);
    }
  }

  getContent(): Delta {
    return this.quill.getContents();
  }

  getContentAsArray(): string[][] {
    const content = this.quill.getContents();
    return content.ops
      .map((op) => (typeof op.insert === "string" ? op.insert.split("\n") : []))
      .filter((arr) => arr.length > 0);
  }

  clearContent(): void {
    this.quill.setContents([]);
  }

  getHTMLContent(): string {
    return this.quill.root?.innerHTML ?? "";
  }
}
