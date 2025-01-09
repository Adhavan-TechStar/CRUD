import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFormComponent } from './app/component-form/component-form.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(ComponentFormComponent, {
    providers: [importProvidersFrom(HttpClientModule)] 
  }).catch(err => console.error(err));