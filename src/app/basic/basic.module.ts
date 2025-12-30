import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
    declarations: [ModalComponent, HeaderComponent, ConfirmComponent],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        FontAwesomeModule,
        TruncatePipe,
    ],
    exports: [ModalComponent, HeaderComponent, ConfirmComponent],
})
export class BasicModule {}
