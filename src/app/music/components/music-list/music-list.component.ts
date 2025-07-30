import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicService } from '../../../services/music.service';
import { SongDto, Tag } from '../../../../Dto/base';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.css'],
    standalone: false,
})
export class MusicListComponent implements OnInit {
    musicList: SongDto[] = [];
    availableTags: Tag[] = []; // Tags fetched from the backend
    filteredTags = new Map<string, Tag[]>();
    repeatIndex: number | null = null; // To keep track of which song to repeat
    currentIndex: number | null = null; // To keep track of which song to repeat
    @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;
    searchText: string = '';
    selectedTags: Tag[] = [];
    private allSongs: SongDto[] = [];
    useAndFilter: boolean = false;

    constructor(private musicService: MusicService) {
        this.fetchTags();
        this.loadMusic();
    }

    ngOnInit(): void {}

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
        this.currentIndex = index;
        const player = this.audioPlayers.toArray()[index].nativeElement;
        player.play();
    }

    playNextSong(currentIndex: number): void {
        let nextIndex = (currentIndex + 1) % this.musicList.length;
        this.playSong(nextIndex);
    }

    fetchTags(): void {
        this.musicService.getTags().subscribe(
            (tags) => {
                this.availableTags = tags;
            },
            (error) => {
                console.error('Error fetching tags:', error);
            },
        );
    }

    loadMusic(): void {
        this.musicService.getMusicList().subscribe({
            next: (data) => {
                this.allSongs = data.map((song: SongDto) => ({
                    ...song,
                    selectedTagsControl: new FormControl(
                        this.mapTagsToAvailableTags(song.tags), // Map tags to match availableTags
                    ),
                    tagSearchControl: new FormControl(''),
                }));
                // Initialize filteredTags for each song
                this.allSongs.forEach((song) =>
                    this.filteredTags.set(song.id, [...this.availableTags]),
                );

                // Subscribe to search control changes for filtering
                this.allSongs.forEach((song: SongDto) => {
                    song.tagSearchControl.valueChanges.subscribe(
                        (searchText) => {
                            this.filteredTags.set(
                                song.id,
                                this.filterTags(searchText),
                            );
                        },
                    );
                });
                this.musicList = this.allSongs;
            },
            error: (error) => {
                console.error('Failed to load music list', error);
            },
        });
    }

    mapTagsToAvailableTags(tags: Tag[]): Tag[] {
        // Ensure the tags are the same references as in availableTags
        return tags.map(
            (tag) =>
                this.availableTags.find(
                    (availableTag) => availableTag.id === tag.id,
                ) || tag,
        );
    }

    filterTags(searchText: string | null): Tag[] {
        console.log(searchText);
        if (!searchText) {
            return this.availableTags;
        }
        return this.availableTags.filter((tag) =>
            tag.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    updateTags(song: SongDto, event: any): void {
        const selectedTags: Tag[] = event.value; // Current selected tags

        // Update the song's tags array with the new selection
        song.tags = [...selectedTags].sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        this.musicService.updateTags(song).subscribe(
            (response) => {
                console.log('Tags updated successfully:', response);
            },
            (error) => {
                console.error('Failed to update tags:', error);
            },
        );

        console.log('Updated Tags:', song.tags);
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
        this.musicList = filteredSongs;
    }
}
