import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-component-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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
    this.fetchRegisteredData();
  }

  fetchRegisteredData(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.registeredData = data;
      },
      (error) => {
        console.error('Error fetching registered data:', error);
      }
    );
  }

  submit(form: NgForm): void {
    if (form.valid) {
      const emailExists = this.registeredData.some(
        (user) => user.email === this.currentUser.email
      );

      if (emailExists) {
        alert('Email already registered. Please use another email.');
        return;
      }

      const { month, day, year } = this.currentUser;
      this.currentUser.birthday = `${month} ${day}, ${year}`;

      if (this.editingIndex !== null) {
        this.registeredData[this.editingIndex] = { ...this.currentUser };
        this.editingIndex = null;
      } else {
        this.registeredData.push({ ...this.currentUser });
      }

      this.resetForm();
      alert('Registration successful!');
    } else {
      alert('Please fill in all required fields.');
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
  }

  clearAll(): void {
    this.registeredData = [];
  }

  deleteUser(index: number): void {
    const userId = this.registeredData[index].id;
    this.userService.deleteUser(userId).subscribe(
      () => {
        alert('User deleted successfully!');
        this.fetchRegisteredData();
      },
      (error) => {
        alert('Error deleting user: ' + error.message);
      }
    );
  }

  editUser(index: number): void {
    this.currentUser = { ...this.registeredData[index] };
    this.editingIndex = index;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
