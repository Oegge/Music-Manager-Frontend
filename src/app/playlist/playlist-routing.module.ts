import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlaylistComponent } from './create/create-playlist.component';
import { PlaylistOverviewComponent } from './overview/playlist-overview.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
    { path: 'create', component: CreatePlaylistComponent },
    { path: 'overview', component: PlaylistOverviewComponent },
    { path: ':playlistId', component: PlaylistComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaylistRoutingModule {}
