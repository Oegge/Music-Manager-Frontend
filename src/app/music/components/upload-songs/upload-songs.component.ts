import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicService } from '../../../services/music.service';
import { debounceTime } from 'rxjs';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import { Tag } from '../../../../objects/dto/base';
import { Song } from '../../../../objects/model/base';

@Component({
    selector: 'app-upload-songs',
    templateUrl: './upload-songs.component.html',
    animations: [
        trigger('transitionMessages', [
            state('open', style({ opacity: 1 })),
            state('closed', style({ opacity: 0 })),
            transition('open => closed', [animate('0.3s ease-out')]),
            transition('closed => open', [animate('0.3s ease-in')]),
        ]),
    ],

    styleUrls: ['./upload-songs.component.css'],
    standalone: false,
})
export class UploadSongsComponent implements OnInit {
    availableTags: Tag[] = [];
    songs: Song[] = [];
    filteredTags: Tag[][] = [];

    constructor(private musicService: MusicService) {}

    ngOnInit(): void {
        this.fetchTags();
        console.log('tags loaded');
    }

    fetchTags(): void {
        this.musicService.getTags().subscribe(
            (tags) => {
                console.log(tags);
                this.availableTags = tags;
            },
            (error) => {
                console.error('Error fetching tags:', error);
            },
        );
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

            this.filteredTags = this.songs.map(() => this.availableTags); // Initialize filtered tags
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

    submitSongs(): void {
        const formData = new FormData();

        this.songs.forEach((song) => {
            formData.append('files', song.file);

            const metadata = {
                title: song.title,
                tags: song.selectedTagsControl.value.filter((tagName: string) =>
                    this.availableTags.some(
                        (existingTag) => tagName === existingTag.name,
                    ),
                ),
                campaigns: [], //TODO ANNE actually allow selecting campaigns here
            };

            formData.append('metadata', JSON.stringify(metadata));
        });

        console.log('FormData for Submission:', formData);

        this.musicService.UploadSongs(formData).subscribe(
            (response) => {
                console.log('Bulk upload successful:', response);
                this.clearForm();
            },
            (error) => {
                console.error('Error during bulk upload:', error);
                this.showError('Failed to upload songs. Please try again.');
            },
        );
    }

    private clearForm(): void {
        this.songs = [];
        this.filteredTags = [];
    }

    private showError(message: string): void {
        console.error(message);
    }
}
