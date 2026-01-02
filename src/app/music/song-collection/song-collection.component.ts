import { Component, Input, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Campaign, SongDto, Tag } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-song-collection',
    templateUrl: './song-collection.component.html',
    styleUrls: ['./song-collection.component.css'],
    standalone: false,
})
export class SongCollectionComponent implements OnInit {
    @Input() scopeCampaign = false;
    @Input() allowTagging = false;
    allSongs: SongDto[] = [];
    filteredSongs: SongDto[] = [];
    availableTags: Tag[] = [];
    filteredTags: Tag[] = [];
    searchText: string = '';
    useAndFilterForTags: boolean = false;
    playingSong: string = '';
    private campaign?: Campaign | null;

    constructor(
        private musicService: MusicService,
        private campaignService: CampaignService,
    ) {}

    ngOnInit(): void {
        if (this.scopeCampaign) {
            this.campaignService.currentCampaign$.subscribe((campaign) => {
                if (this.campaign?.id != campaign?.id) {
                    this.playingSong = '';
                    this.campaign = campaign;
                    this.fetchTags();
                    this.loadMusic();
                }
            });
        } else {
            this.fetchTags();
            this.loadMusic();
        }
    }

    activateSong(songId: string): void {
        this.playingSong = songId;
    }

    playNextSong(currentSongId: string): void {
        const index = this.getSongIndex(currentSongId);
        let nextIndex = (index + 1) % this.filteredSongs.length;
        this.activateSong(this.filteredSongs[nextIndex].id);
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
        this.filteredSongs = filteredSongs;
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
        if (this.scopeCampaign) {
            if (!!this.campaign) {
                this.musicService
                    .getMusicForCampaign(this.campaign.id)
                    .subscribe({
                        next: (data) => {
                            this.allSongs = data as SongDto[];
                            this.applyFilters();
                        },
                        error: (error) => {
                            console.error(
                                'Failed to load music list for campaign',
                                error,
                            );
                        },
                    });
            }
        } else {
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
        return this.filteredSongs.findIndex((song) => song.id === songId);
    }
}
