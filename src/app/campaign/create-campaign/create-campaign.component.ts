import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-campaign',
    templateUrl: './create-campaign.component.html',
    styleUrl: './create-campaign.component.css',
    standalone: false,
})
export class CreateCampaignComponent {
    protected campaignName = '';

    constructor(
        private campaignService: CampaignService,
        private router: Router,
    ) {}

    onCreateCampaign(campaignName: string): void {
        if (!campaignName?.trim()) {
            return;
        }
        this.campaignService.createNewCampaign(campaignName).subscribe({
            next: () => {
                this.router.navigate(['/campaign/overview']);
            },
            error: (err) => {
                console.error('Failed to create campaign', err);
            },
        });
    }
}
