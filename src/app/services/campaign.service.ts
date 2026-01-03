import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Campaign } from '../../objects/dto/base';
import { RefreshPersistingStorageService } from './refresh-persisting-storage.service';

@Injectable({
    providedIn: 'root',
})
export class CampaignService {
    private baseUrl = environment.apiUrl + 'api/campaign';
    private readonly CAMPAIGN_STORAGE_KEY = 'current.campaign';
    private readonly campaignsSubject = new BehaviorSubject<Campaign[]>([]);
    public readonly campaigns$ = this.campaignsSubject.asObservable();

    private readonly currentCampaignSubject =
        new BehaviorSubject<Campaign | null>(null);

    public readonly currentCampaign$ =
        this.currentCampaignSubject.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: RefreshPersistingStorageService,
    ) {
        this.currentCampaignSubject.next(
            this.sessionStorageService.getObject(this.CAMPAIGN_STORAGE_KEY),
        );
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

    public deleteCampaign(campaign: Campaign) {
        return this.http.delete(`${this.baseUrl}/${campaign.id}`).pipe(
            tap(() => {
                this.refreshCampaigns();
            }),
        );
    }

    public selectCampaign(selectedCampaign: Campaign | null): void {
        if (this.currentCampaignSubject.value !== selectedCampaign) {
            this.currentCampaignSubject.next(selectedCampaign);
            if (selectedCampaign) {
                this.sessionStorageService.setObject<Campaign>(
                    this.CAMPAIGN_STORAGE_KEY,
                    selectedCampaign,
                );
            } else {
                this.sessionStorageService.remove(this.CAMPAIGN_STORAGE_KEY);
            }
        }
    }

    public getCampaign(campaignId: string) {
        return this.http.get<Campaign>(`${this.baseUrl}/${campaignId}`);
    }

    public addSongsToCampaign(campaignId: string, songIds: string[]) {
        const bodyParams = { SongIds: songIds };
        return this.http.put(
            `${this.baseUrl}/${campaignId}/add-songs`,
            bodyParams,
        );
    }

    public removeSongsFromCampaign(campaignId: string, songIds: string[]) {
        const bodyParams = { SongIds: songIds };
        return this.http.put(
            `${this.baseUrl}/${campaignId}/remove-songs`,
            bodyParams,
        );
    }

    private refreshCampaigns() {
        this.http.get<Campaign[]>(this.baseUrl).subscribe({
            next: (cs) => {
                this.campaignsSubject.next(cs);
                const current = this.currentCampaignSubject.value;
                if (!!current && !cs.some((c) => c.id === current.id)) {
                    this.currentCampaignSubject.next(null);
                }
            },
            error: (err) => console.error('refreshing campaigns failed', err),
        });
    }
}
