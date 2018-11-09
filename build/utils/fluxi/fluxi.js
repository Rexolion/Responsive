"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dispatcher {
    constructor() {
        this.events = {};
    }
    addListener(event, callback) {
        // Check and push event to listeners array
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: [],
            };
        }
        this.events[event].listeners.push(callback);
    }
    removeListener(event, callback) {
        // Check for existing
        if (this.events[event] === undefined) {
            throw Error;
        }
        this.events[event].listeners = this.events[event].listeners.filter((listener) => {
            return listener.toString() !== callback.toString();
        });
    }
    dispatch(event, data) {
        if (this.events[event] === undefined) {
            throw Error;
        }
        this.events[event].listeners.forEach((listener) => {
            listener(data);
        });
    }
}
exports.Dispatcher = Dispatcher;
