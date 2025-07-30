import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongDto, Tag } from '../../Dto/base';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MusicService {
    private baseUrl = environment.apiUrl + 'api/Music';

    constructor(private http: HttpClient) {}

    getMusicList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.baseUrl}/tags`);
    }

    uploadSong(request: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}`, request);
    }

    bulkUploadSongs(request: FormData) {
        return this.http.post(`${this.baseUrl}/bulk`, request);
    }

    updateTags(song: SongDto): Observable<any> {
        const url = `${this.baseUrl}/${song.id}/tags`;
        const body = { tags: song.tags };
        return this.http.patch(url, body);
    }
}
