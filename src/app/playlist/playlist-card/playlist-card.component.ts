import { Component, Input, OnInit } from '@angular/core';
import { PlaylistDto } from '../../../objects/dto/base';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-playlist-card',
    templateUrl: './playlist-card.component.html',
    styleUrl: './playlist-card.component.css',
    standalone: false,
})
export class PlaylistCardComponent implements OnInit {
    @Input() playlist!: PlaylistDto;

    protected deleteQuestion = 'Do you want to delete this playlist?';
    protected deletionRequested = false;

    constructor(
        private playlistService: PlaylistService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.deleteQuestion = `Do you want to delete ${this.playlist.name}?`;
    }

    navigateToPlaylist(id: string): void {
        this.router.navigate(['/playlist', id]);
    }

    onRequestDelete(): void {
        this.deletionRequested = true;
    }

    onCancelDelete(): void {
        this.deletionRequested = false;
    }

    public onDelete() {
        if (this.playlist) {
            this.playlistService.deletePlaylist(this.playlist.id).subscribe();
        }
    }
}
