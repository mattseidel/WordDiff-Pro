import { initializeCreatePage } from "./ui/pages/CreatePage";
import { initializeEditPage } from "./ui/pages/EditPage";
import { EditorState } from "./application/EditorState";
import { initializeNavigation } from "./ui/components/Navigation";
import { initializeReviewPage } from "./ui/pages/ReviewPage";
import { CompletePage } from "./ui/pages/CompletePage";

document.addEventListener("DOMContentLoaded", () => {
  const editorState = new EditorState();

  initializeCreatePage(editorState);
  initializeEditPage(editorState);
  initializeReviewPage(editorState);
  CompletePage(editorState);
  initializeNavigation();
});
