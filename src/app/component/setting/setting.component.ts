import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from 'src/app/model/signup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  profileForm!: FormGroup;
  avatar!: String;
  username: String = '';
  name: String = '';
  phone_no: String = '';
  email: String = '';
  description: String = '';
  credential!: signup;

  constructor(private auth: AuthService, private router: Router) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.auth.getuserId(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.name = Response.msg['Name'];
        this.phone_no = Response.msg['Phone_no'];
        this.username = Response.msg['Username'];
        this.email = Response.msg['Email'];
        this.description = Response.msg['Description'];
        this.avatar = Response.msg['Avatar'];
        this.profileForm = new FormGroup({
          name: new FormControl(this.name, []),
          phone_no: new FormControl(this.phone_no, [
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
          description: new FormControl(this.description, []),
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit(): void {}

  @ViewChild('fileInput') fileInput: any;

  save() {
    const formData = new FormData();
    const fi = this.fileInput.nativeElement;
    const fileToUpload = fi.files[0];
    if (fileToUpload) {
      formData.append('file', fileToUpload);
      const data = this.auth.checkAuth();
      if (!data.success) {
        this.router.navigateByUrl('/login');
      }
      this.auth.getPassword(data.userId).subscribe((Response: any) => {
        this.auth.uploadImage(formData).subscribe((Response_upload: any) => {
          if (this.profileForm.valid) {
            this.credential = {
              Name: this.profileForm.value['name'],
              Username: this.username,
              Avatar: Response_upload.msg,
              Email: this.email,
              Password: Response.msg,
              Description: this.profileForm.value['description'],
              Phone_no: this.profileForm.value['phone_no'],
            };
            this.auth
              .updateProfile(this.credential, data.userId)
              .subscribe((Response: any) => {
                if (Response.success) {
                  this.router.navigateByUrl('/');
                } else {
                  alert(Response.msg);
                }
              });
          }
        });
      });
    } else {
      const data = this.auth.checkAuth();
      if (!data.success) {
        this.router.navigateByUrl('/login');
      }
      this.auth.getPassword(data.userId).subscribe((Response: any) => {
        if (this.profileForm.valid) {
          this.credential = {
            Name: this.profileForm.value['name'],
            Username: this.username,
            Avatar: this.avatar,
            Email: this.email,
            Password: Response.msg,
            Description: this.profileForm.value['description'],
            Phone_no: this.profileForm.value['phone_no'],
          };
          console.log(this.credential);
          this.auth
            .updateProfile(this.credential, data.userId)
            .subscribe((Response: any) => {
              if (Response.success) {
                this.router.navigateByUrl('/');
              } else {
                alert(Response.msg);
              }
            });
        }
      });
    }
  }

  redirect() {
    this.router.navigateByUrl('/');
  }

  numberOnly(event: any): Boolean {
    const charcode = event.which ? event.which : event.keyCode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
      return false;
    }
    return true;
  }
}
