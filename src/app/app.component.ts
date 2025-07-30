import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Corrected this property name
})
export class AppComponent {
    title = 'MusicManager';
}
