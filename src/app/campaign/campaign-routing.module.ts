import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';

const routes: Routes = [
    { path: 'overview', component: CampaignOverviewComponent },
    { path: 'create', component: CreateCampaignComponent },
    { path: ':campaignId', component: CampaignDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CampaignRoutingModule {}
