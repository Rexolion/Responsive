"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fluxiStore_1 = require("../utils/fluxi/fluxiStore");
const appendCards_1 = require("../components/template/appendCards");
const appendMultimedia_1 = require("../components/template/appendMultimedia");
const multimedia = new appendMultimedia_1.MultimediaTemplate();
class SmartHouseStore extends fluxiStore_1.Store {
    getCards() {
        appendCards_1.appendCards();
    }
    getMultimedia() {
        multimedia.appendMultimedia();
    }
}
exports.SmartHouseStore = SmartHouseStore;
