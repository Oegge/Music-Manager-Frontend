import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { SongDto, Tag } from '../../../../../dto/base';
import { MusicService } from '../../../../services/music.service';
import { FileService } from '../../../../services/file.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-taggable-song',
    standalone: false,
    templateUrl: './taggable-song.component.html',
    styleUrl: './taggable-song.component.css',
})
export class TaggableSongComponent implements OnInit {
    @Input() song!: SongDto;
    private _playing = false;
    @Input() set playing(value: boolean) {
        this._playing = value;
        if (this._playing) this.audioPlayerRef?.nativeElement?.play();
        else {
            this.audioPlayerRef?.nativeElement?.pause();
            if (this.audioPlayerRef?.nativeElement)
                this.audioPlayerRef.nativeElement.currentTime = 0;
        }
    }
    @Input() availableTags: Tag[] = [];
    @Output() next = new EventEmitter<void>();
    @Output() restart = new EventEmitter<void>();
    @Output() start = new EventEmitter<void>();

    @ViewChild('audioPlayer', { static: false })
    audioPlayerRef!: ElementRef<HTMLAudioElement>;

    public repeat = false;
    public tagsControl = new FormControl<Tag[]>([]);
    public tagSearchControl = new FormControl<Tag[]>([]);

    constructor(
        private musicService: MusicService,
        public fileService: FileService,
    ) {}

    ngOnInit(): void {
        this.tagsControl.setValue(this.availableTags);
        this.tagSearchControl.setValue(this.availableTags);
    }

    toggleRepeat(): void {
        this.repeat = !this.repeat;
    }

    handleSongEnd(): void {
        if (this.repeat) {
            this.restart.emit();
        } else {
            this.playing = false;
            this.next.emit();
        }
    }

    startPlaying(): void {
        this.playing = true;
        this.start.emit();
    }

    updateTags(): void {
        this.song.tags = [...(this.tagsControl?.value ?? [])].sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        this.musicService.updateTags(this.song).subscribe({
            next: (response) => {
                console.log('Tags updated successfully:', response);
            },
            error: (error) => {
                console.error('Failed to update tags:', error);
            },
        });

        console.log('Updated Tags:', this.song.tags);
    }
}
