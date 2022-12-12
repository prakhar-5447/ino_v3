import { Component, OnInit } from '@angular/core';
import { AddProjectComponent } from 'src/app/modal/add-project/add-project.component';
import { Dialog } from '@angular/cdk/dialog';
import { ViewProjectComponent } from 'src/app/modal/view-project/view-project.component';
import { ViewSocialsComponent } from 'src/app/modal/view-socials/view-socials.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { getsocial } from 'src/app/model/getsocial';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service';
import { FollowService } from 'src/app/services/follow.service';

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
  projectInfo: project[] = [];
  socials!: getsocial;

  constructor(
    public dialog: Dialog,
    private router: Router,
    private auth: AuthService,
    private project: ProjectService,
    private user: UserService,
    private modal: ModalService,
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
    this.user.getsocial(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.modal.setSocial(Response.msg[0]);
        this.socials = Response.msg[0];
      }
    });
    this.project.getproject(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.projectInfo = Response.msg;
        for (let i = 0; i < this.projectInfo.length; i++) {
          this.projectInfo[i].Technology = JSON.parse(
            this.projectInfo[i].Technology
          );
        }
        this.modal.setProject(this.projectInfo);
      }
    });
  }

  ngOnInit(): void {}

  create_new() {
    this.dialog.open(AddProjectComponent);
  }

  openDialog(index: any) {
    this.modal.setIndex(index);
    this.dialog.open(ViewProjectComponent);
  }

  view_socials() {
    this.dialog.open(ViewSocialsComponent);
  }
}
