import { Change, diffWords } from "diff";

export class DiffService {
  // Obtiene las diferencias entre dos textos usando diffWords
  static getDiffs(original: string, current: string): Change[] {
    return diffWords(original, current);
  }

  // Genera HTML para mostrar las diferencias como ion-radio-group
  static generateDiffHtml(diffs: Change[]): string {
    let html = `
      <ion-card>
        <ion-card-header>Element changed</ion-card-header>
        <ion-card-content>
    `;

    let index = 0;
    let inRadioGroup = false;

    // Recorremos cada cambio para generar el HTML correspondiente
    diffs.forEach((diff, i) => {
      const isChanged = diff.added || diff.removed;

      if (isChanged) {
        if (!inRadioGroup) {
          // Abrir un nuevo grupo de radio para los cambios
          html += `<ion-radio-group value="element-${index}" allow-empty-selection="true">`;
          inRadioGroup = true;
        }

        // Agregar el elemento de cambio (added o removed)
        html += this.buildHtmlElement(diff);

        // Cerrar grupo si el siguiente no es un cambio
        const nextDiff = diffs[i + 1];
        if (!nextDiff || !(nextDiff.added || nextDiff.removed)) {
          html += `</ion-radio-group>`;
          inRadioGroup = false;
          index++;
        }
      } else {
        // Texto sin cambios fuera del grupo
        if (inRadioGroup) {
          html += `</ion-radio-group>`;
          inRadioGroup = false;
          index++;
        }
        html += `<span>${diff.value}</span>`;
      }
    });

    // Cierre final del grupo si quedó abierto
    if (inRadioGroup) {
      html += `</ion-radio-group>`;
    }

    html += `</ion-card-content></ion-card>`;
    return html;
  }

  // Genera un elemento de ion-radio para cada cambio
  private static buildHtmlElement(diff: Change): string {
    const displayValue = diff.added
      ? diff.value
      : `<s style="color:red;">${diff.value}</s>`;

    return `
      <ion-item>
        <ion-radio value="${diff.value}">
          ${displayValue}
        </ion-radio>
      </ion-item>
    `;
  }
}
