import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false,
})
export class HeaderComponent implements OnInit {
    private readonly campaignService: CampaignService;
    private destroyRef = inject(DestroyRef);
    public faBook = faBook;
    public campaigns: Campaign[] = [];
    public currentCampaign?: Campaign;

    constructor(campaignService: CampaignService) {
        this.campaignService = campaignService;
    }

    ngOnInit(): void {
        this.campaignService.campaigns$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaigns) => this.updateCampaigns(campaigns));
        this.campaignService.currentCampaign$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaign) => (this.currentCampaign = campaign));
    }

    public onCampaignIdChange(campaignId: string): void {
        if (!campaignId) {
            this.campaignService.selectCampaign(undefined);
            return;
        }

        const selectedCampaign = this.campaigns.find(
            (c) => c.id === campaignId,
        );
        if (selectedCampaign) {
            this.campaignService.selectCampaign(selectedCampaign);
        }
    }

    private updateCampaigns(newCampaigns: Campaign[]): void {
        this.campaigns = newCampaigns;
    }
}
