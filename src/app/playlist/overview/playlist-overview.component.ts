import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { Campaign, PlaylistDto } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-overview',
    standalone: false,
    templateUrl: './playlist-overview.component.html',
    styleUrl: './playlist-overview.component.css',
})
export class PlaylistOverviewComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    playlists: PlaylistDto[] = [];
    currentCampaign: Campaign | null = null;

    constructor(
        private playlistService: PlaylistService,
        private campaignService: CampaignService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loadPlaylists();
        this.campaignService.currentCampaign$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((campaign) => {
                this.currentCampaign = campaign;
                this.loadPlaylists();
            });
    }

    loadPlaylists(): void {
        if (!this.currentCampaign) {
            this.playlists = [];
            return;
        }
        this.playlistService
            .getPlaylistsByCampaign(this.currentCampaign.id)
            .subscribe({
                next: (data: PlaylistDto[]) => {
                    this.playlists = data;
                },
                error: (error) => {
                    console.error('Failed to load music list', error);
                },
            });
    }

    onCreatePlaylist(): void {
        this.router.navigate(['/playlist/create']);
    }
}
