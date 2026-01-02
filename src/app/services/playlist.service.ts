import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlaylistDto } from '../../objects/dto/base';

@Injectable({
    providedIn: 'root',
})
export class PlaylistService {
    private baseUrl = environment.apiUrl + 'api/playlist';

    constructor(private http: HttpClient) {}

    create(request: any) {
        return this.http.post<string>(`${this.baseUrl}`, request);
    }

    getPlaylists(): Observable<PlaylistDto[]> {
        return this.http.get<PlaylistDto[]>(`${this.baseUrl}`);
    }

    getPlaylistsByCampaign(campaignId: string): Observable<PlaylistDto[]> {
        const params = new HttpParams().set('campaignId', campaignId);
        return this.http.get<PlaylistDto[]>(this.baseUrl, { params });
    }

    get(playlistId: string): Observable<PlaylistDto> {
        return this.http.get<PlaylistDto>(`${this.baseUrl}/${playlistId}`);
    }

    deletePlaylist(id: string) {
        return this.http.delete(`${this.baseUrl}/` + id);
    }
}
