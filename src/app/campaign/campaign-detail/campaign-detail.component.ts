import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Campaign, PlaylistDto, SongDto } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';
import { MusicService } from '../../services/music.service';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-campaign-detail',
    templateUrl: './campaign-detail.component.html',
    styleUrl: './campaign-detail.component.css',
    standalone: false,
})
export class CampaignDetailComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    public campaign!: Campaign;
    public songs: SongDto[] = [];
    public playlists: PlaylistDto[] = [];

    constructor(
        private campaignService: CampaignService,
        private musicService: MusicService,
        private playlistService: PlaylistService,
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
                this.musicService
                    .getSongsByCampaign(campaignId)
                    .subscribe((songs) => (this.songs = songs));
                this.playlistService
                    .getPlaylistsByCampaign(campaignId)
                    .subscribe((playlists) => (this.playlists = playlists));
            }
        });
    }

    public onGoToSongs() {
        this.campaignService.selectCampaign(this.campaign);
        this.router.navigate(['/music/library']);
    }

    public onGoToPlaylists() {
        this.campaignService.selectCampaign(this.campaign);
        this.router.navigate(['/playlist/overview']);
    }
}
