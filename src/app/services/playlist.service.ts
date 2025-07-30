import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaylistDto, SongDto, Tag } from '../../Dto/base';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PlaylistService {
    private baseUrl = environment.apiUrl + 'api/Playlist';

    constructor(private http: HttpClient) {}

    create(request: any) {
        return this.http.post<string>(`${this.baseUrl}`, request);
    }

    getAll(): Observable<PlaylistDto[]> {
        return this.http.get<PlaylistDto[]>(`${this.baseUrl}`);
    }

    get(playlistId: string): Observable<PlaylistDto> {
        return this.http.get<PlaylistDto>(`${this.baseUrl}/${playlistId}`);
    }

    deletePlaylist(id: string) {
        return this.http.delete(`${this.baseUrl}/` + id);
    }
}
