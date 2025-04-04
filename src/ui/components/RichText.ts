import Quill from "quill";

export const createQuill = (element: HTMLElement) => {
  const quill = new Quill(element, {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }], // Colores de texto y fondo
        [{ align: [] }], // Alineación
        [{ list: "ordered" }, { list: "bullet" }],
      ],
      clipboard: {
        matchVisual: true,
      },
      history: {
        delay: 1000,
        maxStack: 100,
        userOnly: true,
      },
      
    },
  });

  return quill;
};
