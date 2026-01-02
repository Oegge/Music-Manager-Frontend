import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';

@Component({
    selector: 'app-campaign-songs',
    templateUrl: './campaign-songs.component.html',
    styleUrl: './campaign-songs.component.css',
    standalone: false,
})
export class CampaignSongsComponent implements OnInit {
    public campaign: Campaign | null = null;
    constructor(private _campaignService: CampaignService) {}

    ngOnInit(): void {
        this._campaignService.currentCampaign$.subscribe((campaign) => {
            this.campaign = campaign;
        });
    }
}
