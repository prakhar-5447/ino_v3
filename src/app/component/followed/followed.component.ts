import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.css'],
})
export class FollowedComponent implements OnInit {
  followArray: any;
  follow: any = [];

  constructor(
    private router: Router,
    private modal: ModalService,
    private dialog: Dialog,
    private auth: AuthService
  ) {
    this.followArray = this.modal.getFollowList();
    for (let i = 0; i < this.followArray.length; i++) {
      this.auth.getuserId(this.followArray[i].id).subscribe((Response: any) => {
        if (Response.success) {
          this.follow.push(Response.msg);
        }
      });
    }
  }

  ngOnInit(): void {}

  view(id: String) {
    this.router.navigateByUrl('view/' + id);
    this.dialog.closeAll();
  }
}
