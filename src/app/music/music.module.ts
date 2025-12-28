import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicRoutingModule } from './music-routing.module';
import { MusicTaggingComponent } from './components/music-tagging/music-tagging.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UploadSongsComponent } from './components/upload-songs/upload-songs.component';
import { BasicModule } from '../basic/basic.module';
import { MusicLibraryComponent } from './components/music-library/music-library.component';
import { SongComponent } from './components/taggable-song/song.component';
import { TagNamesPipe } from '../pipes/tag-names.pipe';

@NgModule({
    declarations: [
        UploadSongsComponent,
        MusicTaggingComponent,
        MusicLibraryComponent,
        SongComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MusicRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatSelectSearchModule,
        BasicModule,
        TagNamesPipe,
    ],
})
export class MusicModule {}
