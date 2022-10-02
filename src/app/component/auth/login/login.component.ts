import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signup!: FormGroup;
  photo!: String;

  constructor() {
    this.signup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phone_no: new FormControl('', [Validators.required]),
      profile_photo: new FormControl(this.photo),
    });
  }

  ngOnInit(): void {}
  create_account() {}
}
