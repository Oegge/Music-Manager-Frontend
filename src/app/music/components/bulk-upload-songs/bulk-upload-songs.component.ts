import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MusicService } from '../../../services/music.service';
import { Song, Tag } from '../../../../dto/base';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { debounceTime } from 'rxjs';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

@Component({
    selector: 'app-bulk-upload-songs',
    templateUrl: './bulk-upload-songs.component.html',
    animations: [
        trigger('transitionMessages', [
            state('open', style({ opacity: 1 })),
            state('closed', style({ opacity: 0 })),
            transition('open => closed', [animate('0.3s ease-out')]),
            transition('closed => open', [animate('0.3s ease-in')]),
        ]),
    ],

    styleUrls: ['./bulk-upload-songs.component.css'],
    standalone: false,
})
export class BulkUploadSongsComponent implements OnInit {
    availableTags: Tag[] = []; // Tags fetched from the backend
    songs: Song[] = [];
    filteredTags: Tag[][] = [];
    selectedFiles: File[] | null = null;

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
                    file: file, // Include the file in the song object
                    title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
                    selectedTagsControl: new FormControl([]),
                    tagSearchControl: tagSearchControl,
                    tags: [],
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

        // Append each song's file and metadata to the FormData
        this.songs.forEach((song) => {
            formData.append('files', song.file); // Attach the file

            // Create a JSON object for the metadata
            const metadata = {
                title: song.title,
                tags: song.selectedTagsControl.value.map(
                    (tagId: string) =>
                        this.availableTags.find((tag) => tag.id === tagId)
                            ?.id || 'Unknown',
                ),
            };

            formData.append('metadata', JSON.stringify(metadata)); // Attach the metadata as JSON
        });

        // Log FormData for debugging
        console.log('FormData for Submission:', formData);

        // Send the FormData to the backend
        this.musicService.bulkUploadSongs(formData).subscribe(
            (response) => {
                console.log('Bulk upload successful:', response);
                this.clearForm(); // Clear form inputs upon success
            },
            (error) => {
                console.error('Error during bulk upload:', error);
                this.showError('Failed to upload songs. Please try again.');
            },
        );
    }

    // Helper methods for form clearing and error display
    clearForm(): void {
        this.songs = []; // Clear the songs array
        this.filteredTags = []; // Reset filtered tags
    }

    showError(message: string): void {
        console.error(message); // Log the error (replace with a user-facing notification)
    }
}
