import { Component, OnInit } from '@angular/core';
import { AddProjectComponent } from 'src/app/modal/add-project/add-project.component';
import { Dialog } from '@angular/cdk/dialog';
import { ViewProjectComponent } from 'src/app/modal/view-project/view-project.component';
import { ViewSocialsComponent } from 'src/app/modal/view-socials/view-socials.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  name!: String;
  phone_no!: String;
  email!: String;
  description!: String;
  avatar!: String;
  project: any[] = [1, 2, 3, , 5, 6, 7, 8, 9, 10];
  socials = [1, 2, 3, 4, 5, 6];

  constructor(
    public dialog: Dialog,
    private router: Router,
    private auth: AuthService
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.auth.getuserId(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.name = Response.msg['Name'];
        this.phone_no = Response.msg['Phone_no'];
        this.email = Response.msg['Email'];
        this.description = Response.msg['Description'];
        this.avatar = Response.msg['Avatar'];
      }
    });
  }

  ngOnInit(): void {}

  create_new() {
    this.dialog.open(AddProjectComponent);
  }

  openDialog() {
    this.dialog.open(ViewProjectComponent);
  }

  view_socials() {
    this.dialog.open(ViewSocialsComponent);
  }
}
