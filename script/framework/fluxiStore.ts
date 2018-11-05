import { EventEmitter } from "events";

export class Store extends EventEmitter {
    public items: object[];

    constructor() {
        super();
        this.items = [];
    }
    public getItems = () => {
        return this.items;
    }

    public addEventHandler = (text: object) => {
        this.items.push(text);
    }

    public emitChange = () => {
        this.emit("change");
    }

    public addChangeListener = (callback) => {
        this.on("change", callback);
    }

    public removeChangeListener = (callback) => {
        this.removeListener("change", callback);
    }

}
