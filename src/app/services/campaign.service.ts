import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Campaign } from '../../objects/dto/base';

@Injectable({
    providedIn: 'root',
})
export class CampaignService {
    private baseUrl = environment.apiUrl + 'api/campaign';

    private readonly campaignsSubject = new BehaviorSubject<Campaign[]>([]);
    public readonly campaigns$ = this.campaignsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.refreshCampaigns();
    }

    createNewCampaign(campaignName: string) {
        return this.http
            .post<Campaign>(this.baseUrl, { name: campaignName })
            .pipe(
                tap(() => {
                    this.refreshCampaigns();
                }),
            );
    }

    private refreshCampaigns() {
        this.http.get<Campaign[]>(this.baseUrl).subscribe({
            next: (cs) => this.campaignsSubject.next(cs),
            error: (err) => console.error('refreshCampaigns failed', err),
        });
    }
}
