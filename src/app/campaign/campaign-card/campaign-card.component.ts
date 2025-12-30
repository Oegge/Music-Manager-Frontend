import { Component, Input } from '@angular/core';
import { Campaign } from '../../../objects/dto/base';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-campaign-card',
    templateUrl: './campaign-card.component.html',
    styleUrl: './campaign-card.component.css',
    standalone: false,
})
export class CampaignCardComponent {
    @Input() public campaign?: Campaign;
}
