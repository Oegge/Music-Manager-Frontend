import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [ModalComponent, HeaderComponent],
    imports: [CommonModule, RouterLink, FormsModule, FontAwesomeModule],
    exports: [ModalComponent, HeaderComponent],
})
export class BasicModule {}
