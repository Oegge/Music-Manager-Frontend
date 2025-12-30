import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../../objects/dto/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-campaign-overview',
    templateUrl: './campaign-overview.component.html',
    styleUrl: './campaign-overview.component.css',
    standalone: false,
})
export class CampaignOverviewComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    protected campaigns: Campaign[] = [];

    constructor(
        private router: Router,
        private campaignService: CampaignService,
    ) {}

    ngOnInit(): void {
        this.campaignService.campaigns$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaigns) => (this.campaigns = campaigns));
    }

    createCampaign(): void {
        this.router.navigate(['/campaign/create']);
    }
}
