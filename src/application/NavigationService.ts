export class NavigationService {
  // Cambia la página activa según el segmento seleccionado
  static changeSegment(selectedPage: string): void {
    // Ocultar todas las páginas
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Mostrar la página seleccionada
    const activePage = document.getElementById(selectedPage);
    if (activePage) {
      activePage.classList.add("active");
    } else {
      console.warn(`Página "${selectedPage}" no encontrada.`);
    }
  }
}
