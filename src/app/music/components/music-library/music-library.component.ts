import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MusicService } from '../../../services/music.service';
import { SongDto, Tag } from '../../../../dto/base';
import { FileService } from '../../../services/file.service';

@Component({
    selector: 'app-music-library',
    standalone: false,
    templateUrl: './music-library.component.html',
    styleUrl: '../music-tagging/music-tagging.component.css',
})
export class MusicLibraryComponent implements OnInit {
    musicList: SongDto[] = [];
    availableTags: Tag[] = [];
    filteredTags: Tag[][] = [];
    repeatIndex: number | null = null;
    @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;

    constructor(
        private musicService: MusicService,
        public fileService: FileService,
    ) {
        this.fetchTags();
        this.loadMusic();
    }

    ngOnInit(): void {}

    fetchTags(): void {
        this.musicService.getTags().subscribe({
            next: (tags) => {
                this.availableTags = tags;
            },
            error: (err) => {
                console.error('Error fetching tags:', err);
            },
        });
    }

    loadMusic(): void {
        this.musicService.getMusicList().subscribe({
            next: (data) => {
                this.musicList = data.map((song: SongDto) => ({
                    ...song,
                }));

                // Initialize filteredTags for each song
                this.filteredTags = this.musicList.map((): Tag[] => [
                    ...this.availableTags,
                ]);

                // Subscribe to search control changes for filtering
                this.musicList.forEach((song: SongDto, i) => {
                    song.tagSearchControl.valueChanges.subscribe(
                        (searchText) => {},
                    );
                });
            },
            error: (error) => {
                console.error('Failed to load music list', error);
            },
        });
    }

    toggleRepeat(index: number): void {
        if (this.repeatIndex === index) {
            this.repeatIndex = null; // Turn off repeat if already set
        } else {
            this.repeatIndex = index; // Set repeat to this song
        }
    }

    handleSongEnd(index: number): void {
        if (this.repeatIndex !== null && this.repeatIndex === index) {
            this.playSong(index); // Repeat the same song
        } else {
            this.playNextSong(index); // Play the next song
        }
    }

    playSong(index: number): void {
        const player = this.audioPlayers.toArray()[index].nativeElement;
        player.play();
    }

    playNextSong(currentIndex: number): void {
        let nextIndex = (currentIndex + 1) % this.musicList.length;
        this.playSong(nextIndex);
    }
}
