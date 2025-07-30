import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
    // Default route: Redirect to the music list page
    { path: '', redirectTo: '/music', pathMatch: 'full' },

    // Lazy load the MusicModule

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

    // Wildcard route: Handles 404 (Page Not Found)
    { path: '**', redirectTo: '/music' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
