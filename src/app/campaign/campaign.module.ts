import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { FormsModule } from '@angular/forms';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { BasicModule } from '../basic/basic.module';
import { CdkStepLabel } from '@angular/cdk/stepper';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { MusicModule } from '../music/music.module';

@NgModule({
    declarations: [
        CampaignOverviewComponent,
        CreateCampaignComponent,
        CampaignCardComponent,
        CampaignDetailComponent,
    ],
    imports: [
        CommonModule,
        CampaignRoutingModule,
        FormsModule,
        BasicModule,
        CdkStepLabel,
        MusicModule,
    ],
})
export class CampaignModule {}
