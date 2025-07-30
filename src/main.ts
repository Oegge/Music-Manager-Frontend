import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideRouter(appRoutes),
        provideAnimations(), // Use animations here
        // Set up the routes directly
    ],
}).catch((err) => console.error(err));
