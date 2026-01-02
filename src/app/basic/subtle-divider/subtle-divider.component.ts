import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-subtle-divider',
    standalone: false,
    templateUrl: './subtle-divider.component.html',
    styleUrl: './subtle-divider.component.css',
})
export class SubtleDividerComponent {
    @Input() label = '';
}
