import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { MusicService } from '../../services/music.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import {
    Campaign,
    CreatePlaylistRequestDto,
    SongDto,
    Tag,
} from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-create',
    templateUrl: './create-playlist.component.html',
    styleUrls: ['./create-playlist.component.css'],
    standalone: false,
})
export class CreatePlaylistComponent implements OnInit {
    musicList: SongDto[] = [];
    playlist: SongDto[] = [];
    availableTags: Tag[] = [];
    selectedTags: Tag[] = [];
    playlistName: string = '';
    searchText: string = '';
    useAndFilter: boolean = false;

    protected campaign?: Campaign;
    private allSongs: SongDto[] = [];

    constructor(
        private musicService: MusicService,
        private playlistService: PlaylistService,
        private campaignService: CampaignService,
        private router: Router,
        public fileService: FileService,
    ) {}

    ngOnInit(): void {
        this.campaignService.currentCampaign$.subscribe((campaign) => {
            if (
                !campaign ||
                (!!this.campaign && campaign.id != this.campaign.id)
            ) {
                this.getRekt();
            } else {
                this.campaign = campaign;
                this.fetchTags();
                this.loadMusic();
            }
        });
    }

    fetchTags(): void {
        this.musicService
            .getTags()
            .subscribe((tags) => (this.availableTags = tags));
    }

    loadMusic(): void {
        if (this.campaign) {
            this.musicService
                .getMusicForCampaign(this.campaign.id)
                .subscribe((data) => {
                    this.allSongs = data;
                    this.musicList = this.allSongs;
                });
        }
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
                        song.tags.includes(tag),
                    );
                });
            } else {
                // OR logic: any of the selected tags may be present
                filteredSongs = filteredSongs.filter((song) => {
                    return this.selectedTags.some((tag) =>
                        song.tags.includes(tag),
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
        const data: CreatePlaylistRequestDto = {
            name: this.playlistName,
            campaignId: this.campaign?.id ?? '',
            songIds: this.playlist.map((song) => song.id),
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

    private getRekt(): void {
        console.log('Aborted playlist creation');
        this.router.navigate(['/playlist/overview']);
    }
}
