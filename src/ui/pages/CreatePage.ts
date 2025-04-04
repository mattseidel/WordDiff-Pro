import { fromEvent } from "rxjs";
import { EditorService } from "../../application/EditorService";
import { EditorState } from "../../application/EditorState";
import { QuillAdapter } from "../../infrastructure/QuillAdapter";
import { createQuill } from "../components/RichText";

export function initializeCreatePage(editorState: EditorState) {
  const create = document.getElementById("create-editor");
  const saveButton = document.getElementById("save-button") as HTMLButtonElement;

  if (create && saveButton) {
    const quill = createQuill(create);
    const editor = new EditorService(new QuillAdapter(quill), editorState);

    
    quill.on("text-change", () => {
      const content = editor.saveContent();
      editorState.setOriginalContent(content);   // Original (solo la primera vez)
      editorState.setCurrentContent(content);    // Actual (siempre)
    });

    // Guardar explícitamente (opcional)
    fromEvent(saveButton, "click").subscribe(() => {
      const content = editor.saveContent();
      editorState.setCurrentContent(content);
      saveButton.disabled = true;
      quill.disable();
    });
  }
  
}
