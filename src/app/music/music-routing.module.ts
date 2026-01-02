import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { CampaignSongsComponent } from './campaign-songs/campaign-songs.component';
import { SongTaggingComponent } from './song-tagging/song-tagging.component';

const routes: Routes = [
    { path: 'bulk-upload', component: UploadSongsComponent },
    { path: 'tag', component: SongTaggingComponent },
    { path: 'library', component: CampaignSongsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
