import { FormControl } from '@angular/forms';

export interface UploadSongRequest {
    file: File;
    title: string;
    artist: string;
    tags: string[];
}

export interface Song {
    file: File;
    title: string;
    selectedTagsControl: FormControl;
    tagSearchControl: FormControl;
    tags: string[];
}

export interface SongDto {
    id: string;
    filePath: string;
    title: string;
    tags: string[];
}

export interface PlaylistDto {
    songs: SongDto[];
    name: string;
    id: string;
}
