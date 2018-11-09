"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartHouseStore_1 = require("../stores/SmartHouseStore");
const fluxi_1 = require("../utils/fluxi/fluxi");
const SmartHouseDispatcher = new fluxi_1.Dispatcher();
const store = new SmartHouseStore_1.SmartHouseStore();
SmartHouseDispatcher.addListener("SMARTHOUSE_CARDS_TRANSITION", (action) => {
    store.addEventHandler(action.text);
    store.getCards();
    store.emitChange();
});
SmartHouseDispatcher.addListener("SMARTHOUSE_MULTIMEDIA_TRANSITION", (action) => {
    store.addEventHandler(action.text);
    store.getMultimedia();
    store.emitChange();
});
exports.default = SmartHouseDispatcher;
