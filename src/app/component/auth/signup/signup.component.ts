import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from 'src/app/model/signup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  photoImage!: String;
  credential!: signup;
  constructor(private auth: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phone_no: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('authId')) {
      this.router.navigateByUrl('/');
    }
  }

  @ViewChild('fileInput') fileInput: any;

  create_account() {
    const formData = new FormData();
    const fi = this.fileInput.nativeElement;
    const fileToUpload = fi.files[0];
    formData.append('file', fileToUpload);
    this.auth.uploadImage(formData).subscribe((Response: any) => {
      this.photoImage = Response.msg;
      if (this.signupForm.valid) {
        this.credential = {
          Name: this.signupForm.value['name'],
          Email: this.signupForm.value['email'],
          Username: this.signupForm.value['username'],
          Password: this.signupForm.value['password'],
          Description: 'My name is ' + this.signupForm.value['name'],
          Avatar: this.photoImage,
          Phone_no: this.signupForm.value['phone_no'],
        };
        this.auth.signup(this.credential);
        this.signupForm.reset();
      }
    });
  }

  numberOnly(event: any): Boolean {
    const charcode = event.which ? event.which : event.keyCode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
}
