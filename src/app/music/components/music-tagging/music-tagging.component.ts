import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../../services/music.service';
import { SongDto, Tag } from '../../../../dto/base';

@Component({
    selector: 'app-music-tagging',
    templateUrl: './music-tagging.component.html',
    styleUrls: ['./music-tagging.component.css'],
    standalone: false,
})
export class MusicTaggingComponent implements OnInit {
    allSongs: SongDto[] = [];
    selectedSongs: SongDto[] = [];
    availableTags: Tag[] = [];
    filteredTags: Tag[] = [];
    searchText: string = '';
    useAndFilterForTags: boolean = false;
    playingSong: string = '';

    constructor(private musicService: MusicService) {}

    ngOnInit(): void {
        this.fetchTags();
        this.loadMusic();
    }

    activateSong(songId: string): void {
        this.playingSong = songId;
    }

    playNextSong(currentSongId: string): void {
        const index = this.getSongIndex(currentSongId);
        let nextIndex = (index + 1) % this.selectedSongs.length;
        this.activateSong(this.selectedSongs[nextIndex].id);
    }

    applyFilters(): void {
        let filteredSongs = this.allSongs;

        if (this.searchText) {
            filteredSongs = filteredSongs.filter((song) =>
                song.title
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase()),
            );
        }
        if (this.filteredTags.length > 0) {
            filteredSongs = filteredSongs.filter((song) =>
                this.useAndFilterForTags
                    ? song.tags.every((tag) =>
                          this.filteredTags.some((f) => f.id === tag.id),
                      )
                    : song.tags.some((tag) =>
                          this.filteredTags.some((f) => f.id === tag.id),
                      ),
            );
        }
        this.selectedSongs = filteredSongs;
    }

    private fetchTags(): void {
        this.musicService.getTags().subscribe({
            next: (tags) => {
                this.availableTags = tags;
            },
            error: (error) => {
                console.error('Error fetching tags:', error);
            },
        });
    }

    private loadMusic(): void {
        this.musicService.getMusicList().subscribe({
            next: (data) => {
                this.allSongs = data as SongDto[];
                this.applyFilters();
            },
            error: (error) => {
                console.error('Failed to load music list', error);
            },
        });
    }

    private filterTags(searchText: string | null): Tag[] {
        if (!searchText) {
            return this.availableTags;
        }
        return this.availableTags.filter((tag) =>
            tag.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    private getSongIndex(songId: string): number {
        return this.selectedSongs.findIndex((song) => song.id === songId);
    }
}
