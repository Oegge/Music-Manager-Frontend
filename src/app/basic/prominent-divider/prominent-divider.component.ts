import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-prominent-divider',
    standalone: false,
    templateUrl: './prominent-divider.component.html',
    styleUrl: './prominent-divider.component.css',
})
export class ProminentDividerComponent {
    @Input() label = '';
}
