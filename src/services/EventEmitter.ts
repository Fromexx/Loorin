import { EventListeners } from "@/utils/helpers/Types";

class EventEmitter {
    #listeners: EventListeners = {};

    #getCallbacksFor(eventName: string) {
        return this.#listeners[eventName] ?? [];
    }

    #setCallbacksFor(eventName: string, listeners: Array<Function>) {
        if(listeners.length === 0) delete this.#listeners[eventName];
        else this.#listeners[eventName] = listeners;
    }

    subscribe(eventName: string, callback: Function) {
        const subs = this.#getCallbacksFor(eventName);
        subs.push(callback);
        this.#listeners[eventName] = subs;
    }

    unsubscribe(eventName: string, callback: Function) {
        const subs = this.#getCallbacksFor(eventName).filter((item) => item !== callback);
        this.#setCallbacksFor(eventName, subs);
    }

    dispatch(eventName: string, data?: any) {
        this.#getCallbacksFor(eventName).forEach((callback) => callback(data));
    }
}

export const eventEmitter = new EventEmitter();