import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BasicModule } from './basic/basic.module';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, BasicModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Corrected this property name
})
export class AppComponent {
    title = 'MusicManager';
}
