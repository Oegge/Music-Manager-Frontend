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

    private readonly currentCampaignSubject = new BehaviorSubject<
        Campaign | undefined
    >(undefined);

    public readonly currentCampaign$ =
        this.currentCampaignSubject.asObservable();

    constructor(private http: HttpClient) {
        this.refreshCampaigns();
    }

    public createNewCampaign(campaignName: string) {
        return this.http
            .post<Campaign>(this.baseUrl, { name: campaignName })
            .pipe(
                tap(() => {
                    this.refreshCampaigns();
                }),
            );
    }

    public selectCampaign(selectedCampaign?: Campaign): void {
        this.currentCampaignSubject.next(selectedCampaign);
    }

    private refreshCampaigns() {
        this.http.get<Campaign[]>(this.baseUrl).subscribe({
            next: (cs) => {
                this.campaignsSubject.next(cs);
                const current = this.currentCampaignSubject.value;
                if (!!current && !cs.some((c) => c.id === current.id)) {
                    this.currentCampaignSubject.next(undefined);
                }
            },
            error: (err) => console.error('refreshing campaigns failed', err),
        });
    }
}
