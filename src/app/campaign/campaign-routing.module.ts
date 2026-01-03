import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { AddSongsComponent } from './add-songs/add-songs.component';
import { RemoveSongsComponent } from './remove-songs/remove-songs.component';

const routes: Routes = [
    { path: 'overview', component: CampaignOverviewComponent },
    { path: 'create', component: CreateCampaignComponent },
    { path: ':campaignId', component: CampaignDetailComponent },
    { path: ':campaignId/add-songs', component: AddSongsComponent },
    { path: ':campaignId/remove-songs', component: RemoveSongsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CampaignRoutingModule {}
