import { Cards } from "./getCards";
import { IJsonEvents } from "./template.interface";
const cards = new Cards();

export function getCards(values: IJsonEvents) {
  values.events.forEach((value) => {
    const grid: HTMLElement | null = document.querySelector(
      ".menu-container-grid",
    );
    if (!!grid) {
      if (value.size === "l") {
        if (value.type === "critical") {
          grid.insertAdjacentHTML(
            "beforeend",
            cards.getLargeCardCritical(value),
          );
        } else {
          grid.insertAdjacentHTML("beforeend", cards.getLargeCardGraph(value));
        }
      } else if (value.size === "s") {
        grid.insertAdjacentHTML("beforeend", cards.getSmallCardStandart(value));
      } else if (value.size === "m") {
        if (value.type === "critical") {
          grid.insertAdjacentHTML(
            "beforeend",
            cards.getMediumCardCritical(value),
          );
        } else if (value.data !== undefined) {
          if (value.source === "Сенсор микроклимата") {
            grid.insertAdjacentHTML(
              "beforeend",
              cards.getMediumCardSensor(value),
            );
          } else if (value.source === "Яндекс.Станция") {
            grid.insertAdjacentHTML(
              "beforeend",
              cards.getMediumCardMusic(value),
            );
          } else if (value.source === "Холодильник") {
            grid.insertAdjacentHTML(
              "beforeend",
              cards.getMediumCardFridge(value),
            );
          }
        }
      }
    }
  });
}
