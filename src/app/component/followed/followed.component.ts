import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.css'],
})
export class FollowedComponent implements OnInit {
  followArray: any;
  follow!: any;
  constructor(private modal: ModalService, private auth: AuthService) {
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
}
