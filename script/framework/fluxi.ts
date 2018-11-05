export class Dispatcher {
    public events: object;

    constructor() {
        this.events = {};
    }

    public addListener(event: string, callback) {

        // Check for wrong types
        if (callback !== "function") {
            console.error("Your listener is not a function, it is a ${typeof callback}");
            return false;
        }

        // Check and push event to listeners array
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: [],
            };
        }

        this.events[event].listeners.push(callback);
    }

    public removeListener(event: string, callback) {

        // Check for existing
        if (this.events[event] === undefined) {
            console.error("This event: ${event} does not exist");
        }

        this.events[event].listeners = this.events[event].listeners.filter((listener) => {
            return listener.toString() !== callback.toString();
        });
    }

    public dispatch(event: string, details) {

        if (this.events[event] === undefined) {
            console.error("This event: ${event} is undefined");
        }

        this.events[event].listeners.forEach((listener) => {
            listener(details);

        });

    }
}

