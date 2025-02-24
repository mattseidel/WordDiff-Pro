export class NodeTransformer {
  // Transforma un nodo a su representación HTML
  static transformNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tag = element.tagName.toLowerCase();

      // Manejo especial para ion-radio-group
      if (tag === "ion-radio-group") {
        return NodeTransformer.getSelectedRadioValue(element);
      }

      // Procesar otros elementos y atributos
      const attributes = Array.from(element.attributes)
        .map((attr) => `${attr.name}="${attr.value}"`)
        .join(" ");
      const innerHTML = Array.from(element.childNodes)
        .map(NodeTransformer.transformNode)
        .join("");

      return `<${tag}${
        attributes ? " " + attributes : ""
      }>${innerHTML}</${tag}>`;
    }

    return "";
  }

  // Obtiene el valor del ion-radio seleccionado
  static getSelectedRadioValue(element: HTMLElement): string {
    
    // Si no se encontró, intenta leer la propiedad value del ion-radio-group
    const groupValue = (element as any).value;
    if (
      groupValue &&
      typeof groupValue === "string" &&
      !/\belement-\d+\b/.test(groupValue)
    ) {
      console.log("groupValue", groupValue);
      
      return groupValue;
    }

    // Por último, recorre los ion-radio hijos y verifica si alguno tiene checked o el atributo checked
    const radios = element.querySelectorAll("ion-radio");
    
    for (const radio of radios) {
      const radioElement = radio as any;
      if (radioElement.checked || radio.getAttribute("checked") !== null) {
        const val = radio.getAttribute("value");
        console.log("selected radio value", val);
        return val ? val : "";
      }
    }

    return "";
  }
}
