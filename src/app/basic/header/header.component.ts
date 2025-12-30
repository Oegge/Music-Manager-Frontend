import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false,
})
export class HeaderComponent implements OnInit {
    private readonly campaignService: CampaignService;
    private destroyRef = inject(DestroyRef);
    public campaigns: Campaign[] = [];

    constructor(campaignService: CampaignService) {
        this.campaignService = campaignService;
    }

    ngOnInit(): void {
        this.campaignService.campaigns$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaigns) => this.updateCampaigns(campaigns));
    }

    private updateCampaigns(newCampaigns: Campaign[]): void {
        this.campaigns = newCampaigns;
    }
}
