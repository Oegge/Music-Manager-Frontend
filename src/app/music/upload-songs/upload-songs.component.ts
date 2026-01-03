import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicService } from '../../services/music.service';
import { debounceTime, take } from 'rxjs';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import { Campaign, Tag } from '../../../objects/dto/base';
import { Song } from '../../../objects/model/base';
import { CampaignService } from '../../services/campaign.service';

@Component({
    selector: 'app-upload-songs',
    templateUrl: './upload-songs.component.html',
    styleUrls: ['./upload-songs.component.css'],
    animations: [
        trigger('transitionMessages', [
            state('open', style({ opacity: 1 })),
            state('closed', style({ opacity: 0 })),
            transition('open => closed', [animate('0.3s ease-out')]),
            transition('closed => open', [animate('0.3s ease-in')]),
        ]),
    ],
    standalone: false,
})
export class UploadSongsComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    songs: Song[] = [];
    availableTags: Tag[] = [];
    filteredTags: Tag[][] = [];
    availableCampaigns: Campaign[] = [];
    selectedCampaignsControl = new FormControl<Campaign[]>([]);
    renamePatternControl = new FormControl<string>('');
    renameReplaceControl = new FormControl<string>('');
    renameError: string | null = null;
    previewOriginal: string = '';
    previewResult: string = '';
    previewError: string | null = null;
    private originalTitles: string[] = [];

    constructor(
        private musicService: MusicService,
        private campaignService: CampaignService,
    ) {}

    ngOnInit(): void {
        this.fetchTags();
        this.fetchCampaigns();
        console.log('tags loaded');
    }

    fetchTags(): void {
        this.musicService.getTags().subscribe({
            next: (tags) => {
                console.log(tags);
                this.availableTags = tags;
            },
            error: (error) => {
                console.error('Error fetching tags:', error);
            },
        });
    }

    fetchCampaigns(): void {
        this.campaignService.campaigns$.pipe(take(1)).subscribe((campaigns) => {
            this.availableCampaigns = campaigns;
        });
    }

    onFilesSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.songs = Array.from(input.files).map((file, index) => {
                const tagSearchControl = new FormControl('');
                tagSearchControl.valueChanges
                    .pipe(debounceTime(300))
                    .subscribe((searchText) => {
                        this.filteredTags[index] = this.filterTags(searchText);
                    });

                return {
                    file: file,
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    selectedTagsControl: new FormControl([]),
                    tagSearchControl: tagSearchControl,
                    tags: [],
                    campaigns: [],
                };
            });
            this.originalTitles = this.songs.map((s) => s.title);
            this.updateRenamePreview();
            this.filteredTags = this.songs.map(() => this.availableTags);
        }
    }

    filterTags(searchText: string | null): Tag[] {
        if (!searchText) {
            return this.availableTags;
        }
        return this.availableTags.filter((tag) =>
            tag.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    applyRenameRegex(): void {
        this.renameError = null;

        const pattern = (this.renamePatternControl.value ?? '').trim();
        const replacement = this.renameReplaceControl.value ?? '';

        if (!pattern) {
            this.songs.forEach((song, i) => {
                song.title = this.originalTitles[i] ?? song.title;
            });
            return;
        }

        let regex: RegExp;
        try {
            regex = new RegExp(pattern, 'g');
        } catch (e: any) {
            this.renameError = e?.message ?? 'Invalid regex pattern.';
            return;
        }

        this.songs.forEach((song, i) => {
            const base = this.originalTitles[i] ?? song.title;
            song.title = base.replace(regex, replacement).trim();
        });

        this.updateRenamePreview();
    }

    updateRenamePreview(): void {
        this.previewError = null;

        if (!this.songs.length) {
            this.previewOriginal = '';
            this.previewResult = '';
            return;
        }

        const base = this.originalTitles[0] ?? this.songs[0].title; // preview first song
        const pattern = (this.renamePatternControl.value ?? '').trim();
        const replacement = this.renameReplaceControl.value ?? '';

        this.previewOriginal = base;

        if (!pattern) {
            this.previewResult = base;
            return;
        }

        try {
            const regex = new RegExp(pattern, 'g');
            this.previewResult = base.replace(regex, replacement).trim();
        } catch (e: any) {
            this.previewError = e?.message ?? 'Invalid regex pattern.';
            this.previewResult = base;
        }
    }

    submitSongs(): void {
        const formData = new FormData();

        this.songs.forEach((song) => {
            formData.append('files', song.file);
            console.log(song.selectedTagsControl.value);

            const metadata = {
                title: song.title,
                tags: song.selectedTagsControl.value
                    .filter((tag: Tag) =>
                        this.availableTags.some(
                            (existingTag) => tag.name === existingTag.name,
                        ),
                    )
                    .map((tag: Tag) => tag.id),
                campaigns: (this.selectedCampaignsControl.value ?? []).map(
                    (c: Campaign) => c.id,
                ),
            };

            formData.append('metadata', JSON.stringify(metadata));
        });

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        this.musicService.UploadSongs(formData).subscribe({
            next: (response) => {
                console.log('Bulk upload successful:', response);
                this.clearForm();
            },
            error: (error) => {
                console.error('Error during bulk upload:', error);
                this.showError('Failed to upload songs. Please try again.');
            },
        });
    }

    private clearForm(): void {
        this.songs = [];
        this.filteredTags = [];
        this.originalTitles = [];

        this.renamePatternControl.setValue('');
        this.renameReplaceControl.setValue('');
        this.renameError = null;
        this.previewOriginal = '';
        this.previewResult = '';
        this.previewError = null;

        this.selectedCampaignsControl.setValue([]);
        this.fileInput.nativeElement.value = '';
    }

    private showError(message: string): void {
        console.error(message);
    }
}
