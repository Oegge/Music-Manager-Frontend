import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicTaggingComponent } from './components/music-tagging/music-tagging.component';
import { BulkUploadSongsComponent } from './components/bulk-upload-songs/bulk-upload-songs.component';
import { MusicLibraryComponent } from './components/music-library/music-library.component';

const routes: Routes = [
    { path: 'bulk-upload', component: BulkUploadSongsComponent },
    { path: 'tag', component: MusicTaggingComponent },
    { path: 'library', component: MusicLibraryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule {}
