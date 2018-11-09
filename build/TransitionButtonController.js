"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartHouseActions_1 = require("./actions/SmartHouseActions");
document.getElementById("svodka").addEventListener("click", SmartHouseActions_1.SmartHouseButtonAction.transitionToCards);
document.getElementById("multimedia").addEventListener("click", SmartHouseActions_1.SmartHouseButtonAction.transtionToMultimedia);
