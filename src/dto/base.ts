import { FormControl } from '@angular/forms';

export interface Tag {
    id: string;
    name: string;
}

export interface UploadSongRequest {
    file: File;
    title: string;
    artist: string;
    tags: Tag[];
}

export interface Song {
    file: File;
    title: string;
    selectedTagsControl: FormControl;
    tagSearchControl: FormControl;
    tags: Tag[];
}

export interface SongDto {
    id: string;
    filePath: string;
    title: string;
    selectedTagsControl: FormControl;
    tagSearchControl: FormControl;
    tags: Tag[];
}

export interface PlaylistDto {
    songs: SongDto[];
    name: string;
    id: string;
}
