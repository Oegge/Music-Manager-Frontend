import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

const routes: Routes = [
    { path: 'overview', component: CampaignOverviewComponent },
    { path: 'create', component: CreateCampaignComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CampaignRoutingModule {}
