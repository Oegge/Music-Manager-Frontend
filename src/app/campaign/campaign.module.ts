import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CampaignOverviewComponent, CreateCampaignComponent],
    imports: [CommonModule, CampaignRoutingModule, FormsModule],
})
export class CampaignModule {}
