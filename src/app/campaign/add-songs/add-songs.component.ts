import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-songs',
    templateUrl: './add-songs.component.html',
    styleUrl: './add-songs.component.css',
    standalone: false,
})
export class AddSongsComponent implements OnInit {
    public campaign!: Campaign;
    private selectedSongIds = new Set<string>();

    constructor(
        private campaignService: CampaignService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const campaignId = params.get('campaignId');
            if (!campaignId) {
                this.router.navigate(['/campaign/overview']);
            } else {
                this.campaignService
                    .getCampaign(campaignId)
                    .subscribe((campaign) => {
                        this.campaign = campaign;
                    });
            }
        });
    }

    public onSongIdsSelected(songIds: Set<string>) {
        this.selectedSongIds = songIds;
    }

    public onAddSongs() {
        this.campaignService
            .addSongsToCampaign(
                this.campaign.id,
                Array.from(this.selectedSongIds),
            )
            .subscribe((response) => {
                this.router.navigate(['/campaign', this.campaign.id]);
            });
    }
}
