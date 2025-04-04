export class DomUtils {
    static getElementById<T extends HTMLElement>(id: string): T | null {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Elemento con ID "${id}" no encontrado.`);
      }
      return element as T;
    }
  
    static clearInnerHTML(element: HTMLElement): void {
      element.innerHTML = "";
    }
  
    static addClass(element: HTMLElement, className: string): void {
      element.classList.add(className);
    }
  
    static removeClass(element: HTMLElement, className: string): void {
      element.classList.remove(className);
    }
  }
  