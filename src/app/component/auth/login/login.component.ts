import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/model/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  credential!: login;
  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('authId')) {
      this.router.navigateByUrl('/');
    }
  }

  continue() {
    if (this.loginForm.valid) {
      this.credential = {
        Email: this.loginForm.value['email'],
        Password: this.loginForm.value['password'],
      };
      this.auth.login(this.credential);
      this.loginForm.reset();
    }
  }
}
