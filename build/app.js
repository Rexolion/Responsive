"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template/template");
const peppa_1 = require("./pointerEvents/peppa");
function json(response) {
    return response.json();
}
fetch('data/events.json')
    .then(json)
    .then(value => {
    template_1.getCards(value);
})
    .then(() => {
    peppa_1.initCriticalCam();
})
    .catch((error) => {
    console.log('Json parsing is failed', error);
});
