import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Remplacement ici

bootstrapApplication(AppComponent, appConfig)       // Et remplacement ici
  .catch((err) => console.error(err));