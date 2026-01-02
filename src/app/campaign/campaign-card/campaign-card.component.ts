import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-campaign-card',
    templateUrl: './campaign-card.component.html',
    styleUrl: './campaign-card.component.css',
    standalone: false,
})
export class CampaignCardComponent implements OnInit {
    private readonly campaignService: CampaignService;
    protected deleteQuestion = 'Do you want to delete this campaign?';
    protected deletionRequested = false;

    @Input() campaign!: Campaign;
    @Output() onShowDetails = new EventEmitter<Campaign>();

    constructor(campaignService: CampaignService) {
        this.campaignService = campaignService;
    }

    ngOnInit(): void {
        this.deleteQuestion = `Do you want to delete ${this.campaign.name}?`;
    }

    onView(): void {
        this.onShowDetails.emit(this.campaign);
    }

    onRequestDelete(): void {
        this.deletionRequested = true;
    }

    onCancelDelete(): void {
        this.deletionRequested = false;
    }

    public onDelete() {
        if (this.campaign) {
            this.campaignService.deleteCampaign(this.campaign).subscribe();
        }
    }
}
