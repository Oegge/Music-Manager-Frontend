import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';

@NgModule({
    declarations: [ModalComponent, HeaderComponent],
    imports: [CommonModule, RouterLink],
    exports: [ModalComponent, HeaderComponent],
})
export class BasicModule {}
