import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SongDto, Tag } from '../../objects/dto/base';

@Injectable({
    providedIn: 'root',
})
export class MusicService {
    private baseUrl = environment.apiUrl + 'api/music';

    constructor(private http: HttpClient) {}

    getSongs(): Observable<SongDto[]> {
        return this.http.get<SongDto[]>(this.baseUrl);
    }

    getSongsByCampaign(campaignId: string): Observable<SongDto[]> {
        const params = new HttpParams().set('campaignId', campaignId);
        return this.http.get<SongDto[]>(this.baseUrl, { params });
    }

    getSongsExcludingCampaign(campaignId: string): Observable<SongDto[]> {
        const params = new HttpParams()
            .set('campaignId', campaignId)
            .set('invertScope', true);
        return this.http.get<SongDto[]>(this.baseUrl, { params });
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
