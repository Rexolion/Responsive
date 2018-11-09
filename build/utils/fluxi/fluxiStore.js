"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Store extends events_1.EventEmitter {
    constructor() {
        super();
        this.getData = () => {
            return this.items;
        };
        this.addEventHandler = (text) => {
            this.items.push(text);
        };
        this.emitChange = () => {
            this.emit("change");
        };
        this.addChangeListener = (callback) => {
            this.on("change", callback);
        };
        this.removeChangeListener = (callback) => {
            this.removeListener("change", callback);
        };
        this.items = [];
    }
}
exports.Store = Store;
