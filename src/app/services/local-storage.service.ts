import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    getItem(key) {
        return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : null;
    }

    setItem(key, value) {
        window.localStorage[key] = JSON.stringify(value);
        return this.getItem(key);
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
    }

    clearAll() {
        window.localStorage.clear();
    }
}
