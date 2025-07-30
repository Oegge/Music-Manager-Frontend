import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
    { path: '', component: CreateComponent },
    { path: 'overview', component: OverviewComponent },
    { path: ':playlistId', component: PlaylistComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaylistRoutingModule {}
