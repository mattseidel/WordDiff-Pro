
import { EditorState } from "../../application/EditorState";

export function CompletePage(editorState: EditorState): void {
  
  const final = document.getElementById("final-text");

  if (!final) throw new Error("No se encontró el contenedor final-text");

  editorState.getFinalText().subscribe((text) => {
    final.innerHTML = text;
  });

  
}
