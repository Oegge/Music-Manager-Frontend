import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicTaggingComponent } from './music-tagging/music-tagging.component';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { MusicLibraryComponent } from './music-library/music-library.component';

const routes: Routes = [
    { path: 'bulk-upload', component: UploadSongsComponent },
    { path: 'tag', component: MusicTaggingComponent },
    { path: 'library', component: MusicLibraryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
