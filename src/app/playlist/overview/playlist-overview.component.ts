import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { PlaylistDto } from '../../../objects/dto/base';

@Component({
    selector: 'app-overview',
    standalone: false,
    templateUrl: './playlist-overview.component.html',
    styleUrl: './playlist-overview.component.css',
})
export class PlaylistOverviewComponent implements OnInit {
    playlists: PlaylistDto[] = [];
    selectedPlaylist: PlaylistDto | null = null;
    isModalOpen = false;

    constructor(
        private playlistService: PlaylistService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loadPlaylist();
    }

    loadPlaylist(): void {
        this.playlistService.getAll().subscribe({
            next: (data: PlaylistDto[]) => {
                this.playlists = data;
            },
            error: (error) => {
                console.error('Failed to load music list', error);
            },
        });
    }

    navigateToPlaylist(id: string): void {
        console.log(id);
        this.router.navigate(['/playlist', id]);
    }

    onCreatePlaylist(): void {
        this.router.navigate(['/playlist/create']);
    }

    openDeleteModal(playlist: PlaylistDto): void {
        this.isModalOpen = !this.isModalOpen;
        this.selectedPlaylist = playlist;
        console.log('Open modal for', playlist);
    }

    closeModal(): void {
        this.isModalOpen = false;
        this.selectedPlaylist = null;
    }

    confirmDelete(): void {
        if (this.selectedPlaylist) {
            this.playlistService
                .deletePlaylist(this.selectedPlaylist.id)
                .subscribe({
                    next: (data) => {
                        this.loadPlaylist();
                    },
                    error: (error) => {
                        console.error(
                            'Failed to delete playlist',
                            this.selectedPlaylist,
                        );
                    },
                });
            this.closeModal();
        }
    }
}
