import { DiffAdapter } from "../../infrastructure/DiffAdapter";
import { EditorService } from "../../application/ReviewSerivce";
import { EditorState } from "../../application/EditorState";

export function initializeReviewPage(editorState: EditorState) {
  const diffAdapter = new DiffAdapter("diff");
  const applyButton = document.getElementById("apply-changes");
  const getTextButton = document.getElementById("btn-get-text");
  const finalTextElement = document.getElementById("final-text");

  editorState.acceptedChanges.subscribe(([original, current]) => {
    console.log("Cambios aceptados", original, current);

    if (!original || !current) return;
    diffAdapter.renderDiffs(original, current);
  });

  // Obtener texto final y mostrarlo
  getTextButton?.addEventListener("click", () => {
    const result = EditorService.getFinalText(document.getElementById("diff"));

    if (finalTextElement) {
      editorState.setFinalText(result);
    }
  });

  // Aplicar cambios (solo ejemplo)
  applyButton?.addEventListener("click", () => {
    alert("Cambios aplicados correctamente.");
  });
  // Al cargar el DOM, actualiza el atributo "data-selected" en cada ion-radio-group
  document.addEventListener("DOMContentLoaded", () => {
    const radioGroups = document.querySelectorAll("ion-radio-group");
    radioGroups.forEach((group) => {
      group.addEventListener("ionChange", (event: any) => {
        // Guarda en un atributo el valor seleccionado
        group.setAttribute("data-selected", event.detail.value);
      });
    });
  });
}
