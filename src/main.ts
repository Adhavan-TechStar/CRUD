import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Import the defined routes
import { RouterModule } from '@angular/router'; // Ensure RouterModule is imported
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule, HttpClientModule),  // Add both RouterModule and HttpClientModule
    provideRouter(routes),  // Provide routing configuration
  ],
}).catch((err) => console.error(err));
