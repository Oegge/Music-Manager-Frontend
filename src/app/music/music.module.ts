import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicRoutingModule } from './music-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { BasicModule } from '../basic/basic.module';
import { SongCollectionComponent } from './song-collection/song-collection.component';
import { SongComponent } from './song/song.component';
import { TagNamesPipe } from '../pipes/tag-names.pipe';
import { CampaignSongsComponent } from './campaign-songs/campaign-songs.component';
import { SongManagementComponent } from './song-management/song-management.component';

@NgModule({
    declarations: [
        UploadSongsComponent,
        SongCollectionComponent,
        SongComponent,
        CampaignSongsComponent,
        SongManagementComponent,
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
    exports: [SongCollectionComponent],
})
export class MusicModule {}
