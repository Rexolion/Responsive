"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const peppa_1 = require("../pointerEvents/peppa");
const template_1 = require("./template");
function json(response) {
    return response.json();
}
function appendCards() {
    fetch("data/events.json")
        .then(json)
        .then((value) => {
        template_1.getCards(value);
    })
        .then(() => {
        peppa_1.initCriticalCam();
    })
        .catch((error) => {
        console.log("Json parsing is failed", error);
    });
}
exports.appendCards = appendCards;
