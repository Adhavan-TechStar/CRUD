import { Component } from '@angular/core';
import { ComponentFormComponent } from "./component-form/component-form.component";
import { TestRequest } from '@angular/common/http/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ComponentFormComponent]
})
export class AppComponent {
  title = 'regform';
}
export const environment = {
  production: true,
};
