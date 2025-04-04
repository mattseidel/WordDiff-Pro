export interface EditorPort {
  setContent(content: string): void;
  getContent(): string;
  clearContent(): void;
}
