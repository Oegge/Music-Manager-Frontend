import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlaylistComponent } from './create/create-playlist.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistOverviewComponent } from './overview/playlist-overview.component';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { BasicModule } from '../basic/basic.module';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        CreatePlaylistComponent,
        PlaylistOverviewComponent,
        CreatePlaylistComponent,
    ],
    imports: [
        CommonModule,
        PlaylistRoutingModule,
        CdkDropList,
        FormsModule,
        BasicModule,
        MatSelect,
        MatOption,
        MatFormField,
        MatSlideToggle,
    ],
})
export class PlaylistModule {}
