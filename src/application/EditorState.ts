import { BehaviorSubject, combineLatest } from "rxjs";

export class EditorState {
  originalDelta = new BehaviorSubject<string>("");
  currentDelta = new BehaviorSubject<string>("");
  acceptedChanges = new BehaviorSubject<string>("");
  finalText = new BehaviorSubject<string>("");

  // Set Original Delta (solo al crear)
  setOriginalContent(content: string): void {
    this.originalDelta.next(content);
  }

  // Set Current Delta (cada cambio)
  setCurrentContent(content: string): void {
    this.currentDelta.next(content);
  }

  setFinalText(content: string): void {
    this.finalText.next(content);
  }

  getFinalText() {
    return this.finalText.asObservable();
  }

  // Obtener observables
  getOriginalContent() {
    return this.originalDelta.asObservable();
  }
  acceptChange(newContent: string): void {
    this.acceptedChanges.next(newContent);
  }

  getCurrentContent() {
    return this.currentDelta.asObservable();
  }

  // Combinar ambos deltas para comparación
  getDeltaComparison() {
    return combineLatest([this.originalDelta, this.currentDelta]);
  }
}
