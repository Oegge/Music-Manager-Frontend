import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { PlaylistRoutingModule } from './playlist-routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, CreateComponent, PlaylistRoutingModule],
})
export class PlaylistModule {}
