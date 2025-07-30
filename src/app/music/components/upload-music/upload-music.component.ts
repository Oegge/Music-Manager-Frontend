import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../../Dto/base';
import { MusicService } from '../../../services/music.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-upload-music',
    standalone: false,
    templateUrl: './upload-music.component.html',
})
export class UploadMusicComponent implements OnInit {
    availableTags: Tag[] = []; // Tags fetched from the backend
    selectedTagId: string | null = null; // Holds the ID of the selected tag
    song = {
        title: '',
        artist: '',
        tags: [] as Tag[], // List of selected tags
    };
    selectedFile: File | null = null;

    constructor(private musicService: MusicService) {}

    ngOnInit(): void {
        this.fetchTags();
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

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    addTag(): void {
        const selectedTag = this.availableTags.find(
            (tag) => tag.id === this.selectedTagId,
        );
        if (
            selectedTag &&
            !this.song.tags.some((tag) => tag.id === selectedTag.id)
        ) {
            this.song.tags.push(selectedTag);
        }
    }

    removeTag(tag: Tag): void {
        this.song.tags = this.song.tags.filter((t) => t.id !== tag.id);
    }

    onSubmit(): void {
        if (!this.selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('title', this.song.title);
        formData.append('artist', this.song.artist);
        formData.append('tags', JSON.stringify(this.song.tags));

        this.musicService.uploadSong(formData).subscribe(
            (response) => {
                console.log('Song uploaded successfully!', response);
                // Reset the form or give feedback
            },
            (error) => {
                console.error('Error uploading song:', error);
            },
        );
    }
}
