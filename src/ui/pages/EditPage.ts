import { fromEvent } from "rxjs";
import { EditorService } from "../../application/EditorService";
import { EditorState } from "../../application/EditorState";
import { QuillAdapter } from "../../infrastructure/QuillAdapter";
import { DiffService } from "../../application/DiffService";
import { createQuill } from "../components/RichText";

export function initializeEditPage(editorState: EditorState) {
  const edit = document.getElementById("edit-editor");
  const saveEditButton = document.getElementById("save-edit-button") as HTMLButtonElement;
  const diffContainer = document.getElementById("diff");

  if (edit && saveEditButton && diffContainer) {
    const quill = createQuill(edit);
    const editor = new EditorService(new QuillAdapter(quill), editorState);

    // Cargar contenido actual en el editor
    editorState.getCurrentContent().subscribe((content) => {

      if (content) {
        editor.loadContent(content);
      }
    });

    // Comparar usando diffArrays
    fromEvent(saveEditButton, "click").subscribe(() => {
      editor.saveContent();
      saveEditButton.disabled = true;
      quill.disable();

      editorState.getDeltaComparison().subscribe(([original, current]) => {
        if (!original || !current) return;

        const diffs = DiffService.getDiffs(original, current);
        diffContainer.innerHTML = DiffService.generateDiffHtml(diffs);
      });
    });
  }
}
