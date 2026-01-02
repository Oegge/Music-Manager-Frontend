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
    campaign: Campaign;
}

export interface CreatePlaylistRequestDto {
    songIds: string[];
    name: string;
    campaignId: string;
}
