import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-component-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css'],
})
export class ComponentFormComponent implements OnInit {
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRegisteredData(); // Fetch data on component initialization
  }

  fetchRegisteredData(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.registeredData = data;
        console.log('Fetched registered data:', data);
      },
      (error) => {
        console.error('Error fetching registered data:', error);
      }
    );
  }

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


  resetForm(): void {
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

  clear(form: NgForm): void {
    this.resetForm();
    form.resetForm();
    console.log('Form cleared.');
  }

  clearAll(): void {
    this.registeredData = [];
    console.log('All registered data cleared.');
  }

  deleteUser(index: number): void {
    const userId = this.registeredData[index].id;
    this.userService.deleteUser(userId).subscribe(
      () => {
        alert('User deleted successfully!');
        this.fetchRegisteredData(); // Refresh data
      },
      (error) => {
        alert('Error deleting user: ' + error.message);
      }
    );
  }

  editUser(index: number): void {
    this.currentUser = { ...this.registeredData[index] }; // Populate current user for editing
    this.editingIndex = index;
    console.log(`Editing user at index ${index}`);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}