import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Campaign, SongDto, Tag } from '../../objects/dto/base';

@Injectable({
    providedIn: 'root',
})
export class CampaignService {
    private baseUrl = environment.apiUrl + 'api/campaign';

    constructor(private http: HttpClient) {}

    getCampaigns(): Observable<Campaign[]> {
        return this.http.get<Campaign[]>(`${this.baseUrl}`);
    }
}
