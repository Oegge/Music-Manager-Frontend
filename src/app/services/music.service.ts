import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SongDto, Tag } from '../../objects/dto/base';

@Injectable({
    providedIn: 'root',
})
export class MusicService {
    private baseUrl = environment.apiUrl + 'api/Music';

    constructor(private http: HttpClient) {}

    getMusicList(): Observable<SongDto[]> {
        return this.http.get<SongDto[]>(this.baseUrl);
    }

    getTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
    }

    UploadSongs(request: FormData) {
        return this.http.post(`${this.baseUrl}`, request);
    }

    updateTags(song: SongDto): Observable<any> {
        const url = `${this.baseUrl}/${song.id}/tags`;
        const body = { tags: song.tags };
        return this.http.patch(url, body);
    }
}
