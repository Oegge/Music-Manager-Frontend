import { Component, OnInit } from '@angular/core';
import { PlaylistDto } from '../../../Dto/base';
import { PlaylistService } from '../../services/playlist.service';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

import { ModalComponent } from '../../basic/modal/modal.component';

@Component({
    selector: 'app-overview',
    imports: [NgForOf, ModalComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
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
