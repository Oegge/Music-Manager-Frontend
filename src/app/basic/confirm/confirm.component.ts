import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-confirm',
    standalone: false,
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
    @Input() question!: string;
    @Output() yes = new EventEmitter<void>();
    @Output() no = new EventEmitter<void>();

    onYes(): void {
        this.yes.emit();
    }

    onNo(): void {
        this.no.emit();
    }
}
