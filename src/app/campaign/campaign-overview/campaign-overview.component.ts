import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';
import { take } from 'rxjs';

@Component({
    selector: 'app-campaign-overview',
    templateUrl: './campaign-overview.component.html',
    styleUrl: './campaign-overview.component.css',
    standalone: false,
})
export class CampaignOverviewComponent implements OnInit {
    protected campaigns: Campaign[] = [];

    constructor(
        private router: Router,
        private campaignService: CampaignService,
    ) {}

    ngOnInit(): void {
        this.campaignService.campaigns$.pipe(take(1)).subscribe((campaigns) => {
            this.campaigns = campaigns;
        });
    }

    createCampaign(): void {
        this.router.navigate(['/campaign/create']);
    }
}
