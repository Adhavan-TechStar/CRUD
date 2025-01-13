import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentFormComponent } from './component-form/component-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, ComponentFormComponent]
})
export class AppComponent {
  title = 'regform';
}
export const environment = {
  production: true,
};
