import { getCards } from "./template/template";
import { initCriticalCam } from "./pointerEvents/peppa";

function json(response: Response) {
  return response.json();
}

fetch("data/events.json")
  .then(json)
  .then(value => {
    getCards(value);
  })
  .then(() => {
    initCriticalCam();
  })
  .catch(error => {
    console.log("Json parsing is failed", error);
  });
