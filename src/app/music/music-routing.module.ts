import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListComponent } from './components/music-list/music-list.component';
import { UploadMusicComponent } from './components/upload-music/upload-music.component';
import { BulkUploadSongsComponent } from './components/bulk-upload-songs/bulk-upload-songs.component';
import { ListenMusicListComponent } from './components/listen-music-list/listen-music-list.component';

const routes: Routes = [
    { path: 'bulk-upload', component: BulkUploadSongsComponent },
    { path: '', component: MusicListComponent },
    { path: 'listen', component: ListenMusicListComponent },
    { path: 'upload', component: UploadMusicComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
