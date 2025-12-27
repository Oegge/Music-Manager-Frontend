import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';

@NgModule({
    declarations: [CampaignOverviewComponent, CreateCampaignComponent],
    imports: [CommonModule, CampaignRoutingModule],
})
export class CampaignModule {}
