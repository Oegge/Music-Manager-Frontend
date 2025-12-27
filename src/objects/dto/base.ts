export interface UploadSongRequest {
    file: File;
    title: string;
    artist: string;
    tags: string[];
}

export interface Tag {
    name: string;
    id: string;
}

export interface Campaign {
    name: string;
    id: string;
}

export interface SongDto {
    id: string;
    filePath: string;
    title: string;
    tags: Tag[];
    campaigns: Campaign[];
}

export interface PlaylistDto {
    songs: SongDto[];
    name: string;
    id: string;
    campaigns: Campaign[];
}
