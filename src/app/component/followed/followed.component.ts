import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.css'],
})
export class FollowedComponent implements OnInit {
  followArray: any;
  followed: any = [];

  constructor(
    private router: Router,
    private modal: ModalService,
    private dialog: Dialog,
    private auth: AuthService,
    private follow: FollowService
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.follow.getfollow(data.userId).subscribe((Response: any) => {
      if (Response.success) {
        this.modal.setFollowList(Response.msg[0]['Followed']);
        this.modal.setId(Response.msg[0]['Id']);
        this.followArray = this.modal.getFollowList();
        for (let i = 0; i < this.followArray.length; i++) {
          this.auth
            .getuserId(this.followArray[i].id)
            .subscribe((Response: any) => {
              if (Response.success) {
                this.followed.push(Response.msg);
              }
            });
        }
      } else {
        this.follow.follow(data.userId);
        this.follow.getfollow(data.userId).subscribe((Response: any) => {
          if (Response.success) {
            this.modal.setFollowList(Response.msg[0]['Followed']);
            this.modal.setId(Response.msg[0]['Id']);
            this.followArray = this.modal.getFollowList();
            for (let i = 0; i < this.followArray.length; i++) {
              this.auth
                .getuserId(this.followArray[i].id)
                .subscribe((Response: any) => {
                  if (Response.success) {
                    this.followed.push(Response.msg);
                  }
                });
            }
          }
        });
      }
    });
  }

  ngOnInit(): void {}

  view(id: String) {
    this.router.navigateByUrl('view/' + id);
    this.dialog.closeAll();
  }
}
