import { EditorPort } from "../domain/EditorPort";
import { EditorState } from "./EditorState";

export class EditorService {
  constructor(private editor: EditorPort, private editorState: EditorState) {}

  // Guardar contenido actual
  saveContent(): string {
  
    const  content = this.editor.getContent();
    console.log(content);
    
    this.editorState.setCurrentContent(content);
    return content;
  }

  // Cargar contenido en el editor
  loadContent(content: string): void {
    this.editor.setContent(content);
  }

  // Establecer contenido original (opcional, solo la primera vez)
  setOriginalContent(): void {
    const content = this.editor.getContent();
    this.editorState.setOriginalContent(content);
  }

  // Limpiar contenido
  clearContent(): void {
    this.editor.clearContent();
    this.editorState.setCurrentContent(""); // Limpia el estado también
  }
}
