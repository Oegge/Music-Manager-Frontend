import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MusicService } from '../../services/music.service';
import { FileService } from '../../services/file.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs';
import { SongDto, Tag } from '../../../objects/dto/base';

@Component({
    selector: 'app-song',
    standalone: false,
    templateUrl: './song.component.html',
    styleUrl: './song.component.css',
})
export class SongComponent implements OnInit {
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
    @Input() availableTags?: Tag[] = [];
    @Input() showCampaigns = false;
    @Output() next = new EventEmitter<void>();
    @Output() restart = new EventEmitter<void>();
    @Output() start = new EventEmitter<void>();

    @ViewChild('audioPlayer', { static: false })
    audioPlayerRef!: ElementRef<HTMLAudioElement>;

    public repeat = false;
    public tagsControl = new FormControl<Tag[]>([]);
    public tagSearchControl = new FormControl<string>('');
    public filteredTags: Tag[] = [];

    constructor(
        private musicService: MusicService,
        public fileService: FileService,
    ) {}

    ngOnInit(): void {
        this.tagsControl.setValue(this.song.tags);
        this.tagSearchControl.valueChanges.pipe(startWith('')).subscribe(() => {
            this.applyFilter();
        });
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

    compareTags(tag1: Tag, tag2: Tag): boolean {
        return tag1 && tag2 ? tag1.id === tag2.id : tag1 === tag2;
    }

    trackById = (_: number, t: Tag) => t.id;

    private applyFilter() {
        const term = (this.tagSearchControl.value ?? '').toLowerCase().trim();
        const all = this.availableTags ?? [];
        this.filteredTags = term
            ? all.filter((t) => t.name?.toLowerCase().includes(term))
            : [...all];
    }
}
