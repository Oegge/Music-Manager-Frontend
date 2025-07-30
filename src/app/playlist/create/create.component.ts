import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { MusicService } from '../../services/music.service';
import { SongDto, Tag } from '../../../Dto/base';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    imports: [
        FormsModule,
        NgForOf,
        MatFormField,
        MatSelect,
        MatOption,
        CdkDropList,
        CdkDrag,
        MatSlideToggle,
    ],
    styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
    musicList: SongDto[] = [];
    playlist: SongDto[] = [];
    availableTags: Tag[] = [];
    selectedTags: Tag[] = [];
    playlistName: string = '';
    searchText: string = '';
    private allSongs: SongDto[] = [];
    useAndFilter: boolean = false;

    constructor(
        private musicService: MusicService,
        private playlistService: PlaylistService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchTags();
        this.loadMusic();
    }

    fetchTags(): void {
        this.musicService
            .getTags()
            .subscribe((tags) => (this.availableTags = tags));
    }

    loadMusic(): void {
        this.musicService.getMusicList().subscribe((data) => {
            this.allSongs = data;
            this.musicList = this.allSongs;
        });
    }

    applyFilters(): void {
        let filteredSongs = this.allSongs;

        // Apply search text filter
        if (this.searchText) {
            filteredSongs = filteredSongs.filter((song) =>
                song.title
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase()),
            );
        }

        // Apply tag filter

        if (this.selectedTags.length) {
            if (this.useAndFilter) {
                // AND logic: every selected tag must be present
                filteredSongs = filteredSongs.filter((song) => {
                    return this.selectedTags.every((tag) =>
                        song.tags.map((t) => t.id).includes(tag.id),
                    );
                });
            } else {
                // OR logic: any of the selected tags may be present
                filteredSongs = filteredSongs.filter((song) => {
                    return song.tags.some((tag) =>
                        this.selectedTags.map((t) => t.id).includes(tag.id),
                    );
                });
            }
        }
        this.musicList = filteredSongs;
    }

    addToPlaylist(song: SongDto): void {
        if (!this.playlist.find((p) => p.id === song.id)) {
            this.playlist.push(song);
        }
    }

    removeFromPlaylist(index: number): void {
        this.playlist.splice(index, 1);
    }

    drop(event: any): void {
        moveItemInArray(this.playlist, event.previousIndex, event.currentIndex);
    }

    savePlaylist(): void {
        const data = {
            name: this.playlistName,
            songs: this.playlist.map((song) => song.id),
        };

        this.playlistService.create(data).subscribe({
            next: (response) => {
                console.log('Playlist saved successfully', response);
                return;
            },
            error: (error) => {
                console.error('Error saving playlist:', error);
            },
        });
        this.router.navigate(['playlist/overview']);
    }

    cancel(): void {
        // Logic to clear or reset the playlist
        this.playlist = [];
        this.playlistName = '';
    }
    @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;

    playSong(index: number) {
        const player = this.audioPlayers.toArray()[index].nativeElement;
        player.play();
    }

    handleSongEnd(index: number): void {
        this.playSong(index); // Repeat the same song
    }
}
