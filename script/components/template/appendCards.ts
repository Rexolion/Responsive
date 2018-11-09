import { initCriticalCam } from "../pointerEvents/peppa";
import { getCards } from "./template";

function json(response: Response) {
  return response.json();
}
export function appendCards() {

  fetch("data/events.json")
    .then(json)
    .then((value) => {
      getCards(value);
    })
    .then(() => {
      initCriticalCam();
    })
    .catch((error) => {
      console.log("Json parsing is failed", error);
    });
}
