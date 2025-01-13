import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Import the defined routes

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule), // Import HttpClientModule for HTTP services
    provideRouter(routes), // Provide the routing configuration
  ],
}).catch((err) => console.error(err));
