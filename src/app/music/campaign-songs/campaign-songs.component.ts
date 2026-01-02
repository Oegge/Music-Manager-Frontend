import { Component, DestroyRef, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-campaign-songs',
    templateUrl: './campaign-songs.component.html',
    styleUrl: './campaign-songs.component.css',
    standalone: false,
})
export class CampaignSongsComponent implements OnInit {
    public campaign: Campaign | null = null;
    constructor(
        private _campaignService: CampaignService,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this._campaignService.currentCampaign$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaign) => {
                this.campaign = campaign;
            });
    }
}
