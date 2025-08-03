import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicTaggingComponent } from './components/music-tagging/music-tagging.component';
import { UploadMusicComponent } from './components/upload-music/upload-music.component';
import { BulkUploadSongsComponent } from './components/bulk-upload-songs/bulk-upload-songs.component';
import { MusicLibraryComponent } from './components/music-library/music-library.component';

const routes: Routes = [
    { path: 'bulk-upload', component: BulkUploadSongsComponent },
    { path: 'tag', component: MusicTaggingComponent },
    { path: 'listen', component: MusicLibraryComponent },
    { path: 'upload', component: UploadMusicComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
