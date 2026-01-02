import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
    set(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    setObject<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getObject<T>(key: string): T | null {
        const raw = sessionStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    }

    remove(key: string): void {
        sessionStorage.removeItem(key);
    }
}
