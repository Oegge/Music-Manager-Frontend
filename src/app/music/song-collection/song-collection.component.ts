import {
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Campaign, SongDto, Tag } from '../../../objects/dto/base';
import { CampaignService } from '../../services/campaign.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-song-collection',
    templateUrl: './song-collection.component.html',
    styleUrls: ['./song-collection.component.css'],
    standalone: false,
})
export class SongCollectionComponent implements OnInit {
    @Input() scopeCampaign = false;
    @Input() allowTagging = false;
    @Input() allowSelecting = false;
    @Output() songIdsSelected = new EventEmitter<Set<string>>();
    allSongs: SongDto[] = [];
    filteredSongs: SongDto[] = [];
    selectedSongIds = new Set<string>();
    availableTags: Tag[] = [];
    filteredTags: Tag[] = [];
    searchText: string = '';
    useAndFilterForTags: boolean = false;
    playingSong: string = '';
    private campaign?: Campaign | null;

    constructor(
        private musicService: MusicService,
        private campaignService: CampaignService,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        if (this.scopeCampaign) {
            this.campaignService.currentCampaign$
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((campaign) => {
                    if (this.campaign?.id != campaign?.id) {
                        this.softResetUserInputs();
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

    onCardClicked(songId: string): void {
        if (this.allowSelecting) {
            if (this.selectedSongIds.has(songId)) {
                this.selectedSongIds.delete(songId);
            } else {
                this.selectedSongIds.add(songId);
            }
            this.songIdsSelected.emit(this.selectedSongIds);
        }
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
        filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
        if (this.allowSelecting) {
            const filteredIds = new Set(filteredSongs.map((s) => s.id));

            this.selectedSongIds.forEach((id) => {
                if (!filteredIds.has(id)) {
                    this.selectedSongIds.delete(id);
                }
            });
            this.songIdsSelected.emit(this.selectedSongIds);
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
                    .getSongsByCampaign(this.campaign.id)
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
            this.musicService.getSongs().subscribe({
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

    private getSongIndex(songId: string): number {
        return this.filteredSongs.findIndex((song) => song.id === songId);
    }

    private softResetUserInputs(): void {
        this.playingSong = '';
        this.selectedSongIds = new Set<string>();
        this.songIdsSelected.emit(this.selectedSongIds);
    }
}
