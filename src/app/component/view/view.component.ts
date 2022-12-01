import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewProjectComponent } from 'src/app/modal/view-project/view-project.component';
import { getsocial } from 'src/app/model/getsocial';
import { project } from 'src/app/model/project';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  following!: Boolean;
  id!: String;
  name!: String;
  phone_no!: String;
  email!: String;
  description!: String;
  avatar!: String;
  userid!: String;
  projectInfo: project[] = [];
  socials!: getsocial;
  followed: any[] = [];

  constructor(
    public dialog: Dialog,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private project: ProjectService,
    private user: UserService,
    private modal: ModalService,
    private follow: FollowService
  ) {
    this.following = false;
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe((params) => {
      this.userid = params['id'];
      this.auth.getuserId(this.userid).subscribe((Response: any) => {
        if (Response.success) {
          this.id = Response.msg['Id'];
          this.name = Response.msg['Name'];
          this.phone_no = Response.msg['Phone_no'];
          this.email = Response.msg['Email'];
          this.description = Response.msg['Description'];
          this.avatar = Response.msg['Avatar'];
        }
      });
      this.follow
        .checkfollow(data.userId, this.userid)
        .subscribe((Response: any) => {
          this.following = Response.success;
          console.log(Response.success);
        });
      this.user.getsocial(this.userid).subscribe((Response: any) => {
        if (Response.success) {
          this.socials = Response.msg[0];
        }
      });
      this.project.getproject(this.userid).subscribe((Response: any) => {
        if (Response.success) {
          this.projectInfo = Response.msg;
          for (let i = 0; i < this.projectInfo.length; i++) {
            this.projectInfo[i].Technology = JSON.parse(
              this.projectInfo[i].Technology
            );
          }
        }
      });
    });
  }

  openDialog(index: any) {
    this.modal.setIndex(index);
    this.dialog.open(ViewProjectComponent);
  }

  follow_toogle() {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    if (this.following) {
      const newFollorList = this.followed;
      let index = newFollorList.findIndex((id: any) => id['id'] == data.userId);
      newFollorList.splice(index, 1);
      let newData = {
        Id: this.modal.getId(),
        Username: data.userId,
        Followed: newFollorList,
      };
      this.follow
        .changefollow(newData, data.userId)
        .subscribe((Response: any) => {
          if (Response.success) {
            this.following = !this.following;
            this.modal.setFollowList(newFollorList);
            this.follow
              .checkfollow(data.userId, this.userid)
              .subscribe((Response: any) => {
                this.following = Response.success;
                console.log(Response.success);
              });
          } else {
            alert(Response.msg);
          }
        });
    } else {
      const newFollorList = this.followed;
      newFollorList.push({ id: this.id });
      let newData = {
        Id: this.modal.getId(),
        Username: data.userId,
        Followed: newFollorList,
      };
      this.follow
        .changefollow(newData, data.userId)
        .subscribe((Response: any) => {
          if (Response.success) {
            this.following = !this.following;
            this.modal.setFollowList(newFollorList);

            this.follow
              .checkfollow(data.userId, this.userid)
              .subscribe((Response: any) => {
                this.following = Response.success;
                console.log(Response.success);
              });
          } else {
            alert(Response.msg);
          }
        });
    }
  }

  ngOnInit(): void {}
}
