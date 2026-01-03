import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RefreshPersistingStorageService {
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    setObject<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getObject<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }
}
