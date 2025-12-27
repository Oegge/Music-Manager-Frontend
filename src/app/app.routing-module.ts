import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/music', pathMatch: 'full' },

    {
        path: 'playlist',
        loadChildren: () =>
            import('./playlist/playlist.module').then((m) => m.PlaylistModule),
    },
    {
        path: 'music',
        loadChildren: () =>
            import('./music/music.module').then((m) => m.MusicModule),
    },
    {
        path: 'campaign',
        loadChildren: () =>
            import('./campaign/campaign.module').then((m) => m.CampaignModule),
    },

    { path: '**', redirectTo: '/music' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
