import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      petName: ['', Validators.required],
      mondayStartTime: ['', Validators.required],
      mondayEndTime: ['', Validators.required],
      tuesdayStartTime: ['', Validators.required],
      tuesdayEndTime: ['', Validators.required],
      wednesdayStartTime: ['', Validators.required],
      wednesdayEndTime: ['', Validators.required],
      thursdayStartTime: ['', Validators.required],
      thursdayEndTime: ['', Validators.required],
      fridayStartTime: ['', Validators.required],
      fridayEndTime: ['', Validators.required],
      saturdayStartTime: ['', Validators.required],
      saturdayEndTime: ['', Validators.required],
      sundayStartTime: ['', Validators.required],
      sundayEndTime: ['', Validators.required],
    });
  }

  addUser() {
    const USER: User = {
      name: this.userForm.get('name')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      pet: {
        name: this.userForm.get('petName')?.value,
        feedingSchedule: {
          monday: [
            {
              startTime: this.userForm.get('mondayStartTime')?.value,
              endTime: this.userForm.get('mondayEndTime')?.value,
            },
          ],
          tuesday: [
            {
              startTime: this.userForm.get('tuesdayStartTime')?.value,
              endTime: this.userForm.get('tuesdayEndTime')?.value,
            },
          ],
          wednesday: [
            {
              startTime: this.userForm.get('wednesdayStartTime')?.value,
              endTime: this.userForm.get('wednesdayEndTime')?.value,
            },
          ],
          thursday: [
            {
              startTime: this.userForm.get('thursdayStartTime')?.value,
              endTime: this.userForm.get('thursdayEndTime')?.value,
            },
          ],
          friday: [
            {
              startTime: this.userForm.get('fridayStartTime')?.value,
              endTime: this.userForm.get('fridayEndTime')?.value,
            },
          ],
          saturday: [
            {
              startTime: this.userForm.get('saturdayStartTime')?.value,
              endTime: this.userForm.get('saturdayEndTime')?.value,
            },
          ],
          sunday: [
            {
              startTime: this.userForm.get('sundayStartTime')?.value,
              endTime: this.userForm.get('sundayEndTime')?.value,
            },
          ],
        },
      },
    };

    this.http.post('http://localhost:3000/api/users/create-user', USER).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.toastr.success('User registered successfully', 'User registered');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error registering user', error);
        this.toastr.error('Error registering user', 'Registration failed');
      }
    );
  }
}