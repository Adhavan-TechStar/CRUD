import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-component-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css']
})
export class ComponentFormComponent {
  registeredData: any[] = [];
  editingIndex: number | null = null;
  currentUser: any = {
    firstname: '',
    lastname: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    month: '',
    day: '',
    year: '',
    phone: ''
  };

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  submit(form: NgForm) {
    if (form.valid) {
      const { month, day, year } = this.currentUser;
      this.currentUser.birthday = `${month} ${day}, ${year}`;

      if (this.editingIndex !== null) {
        // Update existing user
        this.registeredData[this.editingIndex] = { ...this.currentUser };
        this.editingIndex = null; // Reset editing index
      } else {
        // Add new user
        this.registeredData.push({ ...this.currentUser });
      }

      this.resetForm();
      console.log("Form submitted successfully!", this.registeredData);
    } else {
      console.log("Form is invalid.");
    }
  }

  resetForm() {
    this.currentUser = {
      firstname: '',
      lastname: '',
      age: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
      month: '',
      day: '',
      year: '',
      phone: ''
    };
    this.editingIndex = null;
  }

  clear(form: NgForm) {
    this.resetForm();
    form.resetForm();
    console.log("Form cleared.");
  }

  clearAll() {
    this.registeredData = [];
    console.log("All registered data cleared.");
  }

  deleteUser(index: number) {
    this.registeredData.splice(index, 1);
    console.log(`User at index ${index} deleted.`);
  }

  editUser(index: number) {
    this.currentUser = { ...this.registeredData[index] }; // Populate current user for editing
    this.editingIndex = index;
    console.log(`Editing user at index ${index}`);
  }
}
