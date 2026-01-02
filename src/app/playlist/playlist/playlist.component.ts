import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { PlaylistDto, SongDto } from '../../../objects/dto/base';

@Component({
    selector: 'app-playlist',
    imports: [NgForOf, MatSlideToggle, FormsModule],
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.css',
})
export class PlaylistComponent implements OnInit {
    private playlistId: any;
    playlist?: PlaylistDto;
    musicList: SongDto[] = [];
    repeatIndex: number | null = null; // To keep track of which song-card to repeat
    @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;
    enableFade: boolean = false;
    isPaused: boolean = false;
    currentSongIndex: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private playlistService: PlaylistService,
        public fileService: FileService,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.playlistId = params.get('playlistId');
        });
        this.loadPlaylist();
    }

    loadPlaylist(): void {
        this.playlistService.get(this.playlistId).subscribe({
            next: (data) => {
                this.playlist = data;
                this.musicList = this.playlist.songs;
            },
            error: (error) => {
                console.error('Failed to load music list', error);
            },
        });
    }

    toggleRepeat(index: number): void {
        if (this.repeatIndex === index) {
            this.repeatIndex = null; // Turn off repeat if already set
        } else {
            this.repeatIndex = index; // Set repeat to this song-card
        }
    }

    handleSongEnd(index: number): void {
        if (this.repeatIndex !== null && this.repeatIndex === index) {
            this.playSong(index); // Repeat the same song-card
        } else {
            this.playNextSong(index); // Play the next song-card
        }
    }

    playNextSong(currentIndex: number): void {
        let nextIndex = (currentIndex + 1) % this.musicList.length;
        this.playSong(nextIndex);
    }

    playSong(index: number): void {
        // Get all audio elements
        this.currentSongIndex = index;

        const players = this.audioPlayers.toArray();
        const currentAudio: HTMLAudioElement | undefined = players.find(
            (p) => !p.nativeElement.paused,
        )?.nativeElement;

        // Check if there is currently playing audio and it's not the one we want to play
        if (currentAudio && currentAudio !== players[index].nativeElement) {
            if (this.enableFade) {
                this.fadeOut(currentAudio, () => {
                    this.startPlay(index); // Start playing new song-card after fade out completes
                });
            } else {
                currentAudio.pause(); // Pause immediately without fading
                currentAudio.currentTime = 0; // Reset the song-card to the start
                this.startPlay(index);
            }
        } else {
            this.startPlay(index); // No current audio playing, so just start the new song-card
        }
    }

    startPlay(index: number): void {
        this.isPaused = false;
        const player: HTMLAudioElement =
            this.audioPlayers.toArray()[index].nativeElement;
        if (this.enableFade) {
            this.fadeIn(player);
        } else {
            player.play();
        }
    }

    fadeIn(audio: HTMLAudioElement): void {
        audio.volume = 0;
        audio.play();
        let volume = 0;
        const interval = setInterval(() => {
            if (volume < 1) {
                volume += 0.1;
                audio.volume = volume;
                if (volume >= 1) {
                    clearInterval(interval);
                }
            }
        }, 50);
    }

    fadeOut(audio: HTMLAudioElement, callback: () => void): void {
        let volume = audio.volume;
        const interval = setInterval(() => {
            if (volume > 0) {
                volume -= 0.05; // Adjust this value for smoother transitions if necessary
                audio.volume = volume;
            }
            if (volume <= 0) {
                clearInterval(interval);
                audio.pause(); // Ensure to pause the audio here
                audio.currentTime = 0; // Reset the song-card to the start if needed
                callback(); // Call the callback after the audio is paused
            }
        }, 50); // Adjust the interval speed as necessary for a smoother fade
    }

    pauseAllPlayers(): void {
        // Access all audio player elements
        this.audioPlayers.forEach((player) => {
            const audioElement = player.nativeElement as HTMLAudioElement;
            if (!audioElement.paused) {
                if (this.enableFade) {
                    this.fadeOut(audioElement, () => {});
                } else {
                    audioElement.pause(); // Pause the currently playing audio
                }
            }
        });
        this.isPaused = true;
    }
}
