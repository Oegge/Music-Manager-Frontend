import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { CampaignSongsComponent } from './campaign-songs/campaign-songs.component';
import { SongManagementComponent } from './song-management/song-management.component';

const routes: Routes = [
    { path: 'bulk-upload', component: UploadSongsComponent },
    { path: 'tag', component: SongManagementComponent },
    { path: 'library', component: CampaignSongsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
