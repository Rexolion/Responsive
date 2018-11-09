import { SmartHouseButtonAction } from "./actions/SmartHouseActions";

document.getElementById("svodka").addEventListener("click", SmartHouseButtonAction.transitionToCards);
document.getElementById("multimedia").addEventListener("click", SmartHouseButtonAction.transtionToMultimedia);
