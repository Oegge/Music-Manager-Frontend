import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FileService {
    private readonly apiUrl = environment.apiUrl.replace(/\/+$/, ''); // trim trailing slash

    getFileUrl(relativePath: string): string {
        const cleaned = relativePath.replace(/^\/+/, '').replace(/\/+/g, '/');
        return `${this.apiUrl}/${cleaned}`;
    }
}
