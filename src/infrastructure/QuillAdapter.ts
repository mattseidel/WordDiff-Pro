import Quill from "quill";
import { EditorPort } from "../domain/EditorPort";

export class QuillAdapter implements EditorPort {
  constructor(private quill: Quill) {}

  setContent(content: string): void {
    try {
      this.quill.root.innerHTML = content;
    } catch (error) {
      console.error("Error al establecer el contenido:", error);
    }
  }

  getContent(): string {
    return this.quill.root.innerHTML;
  }

  clearContent(): void {
    this.quill.setContents([]);
  }
}
