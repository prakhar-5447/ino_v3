import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-socials',
  templateUrl: './view-socials.component.html',
  styleUrls: ['./view-socials.component.css'],
})
export class ViewSocialsComponent implements OnInit {
  socialForm!: FormGroup;

  socialInfo!: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private user: UserService
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.user.getsocial(data.userId).subscribe((Response: any) => {
      console.log(Response);
      if (Response.success) {
        this.socialForm = new FormGroup({
          instagram: new FormControl(Response.msg[0]['Instagram'], []),
          twitter: new FormControl(Response.msg[0]['LinkedIn'], []),
          linkedin: new FormControl(Response.msg[0]['Twitter'], []),
          github: new FormControl(Response.msg[0]['Github'], []),
          portfolio: new FormControl(Response.msg[0]['Portfolio'], []),
          other: new FormControl(Response.msg[0]['Other'], []),
        });
      } else {
        this.socialForm = new FormGroup({
          instagram: new FormControl('', []),
          twitter: new FormControl('', []),
          linkedin: new FormControl('', []),
          github: new FormControl('', []),
          portfolio: new FormControl('', []),
          other: new FormControl('', []),
        });
      }
    });
  }

  ngOnInit(): void {}

  send() {
    if (this.socialForm) {
      const data = this.auth.checkAuth();
      if (!data.success) {
        this.router.navigateByUrl('/login');
      }
      this.user.getsocial(data.userId).subscribe((Response: any) => {
        if (Response.success) {
          this.socialInfo = {
            Id: Response.msg[0]['Id'],
            Instagram: this.socialForm.value['instagram'],
            Twitter: this.socialForm.value['twitter'],
            LinkedIn: this.socialForm.value['linkedin'],
            Github: this.socialForm.value['github'],
            Portfolio: this.socialForm.value['portfolio'],
            Other: this.socialForm.value['other'],
          };
          this.user.changesocial(this.socialInfo, data.userId);
        } else {
          this.socialInfo = {
            Username: data.userId,
            Instagram: this.socialForm.value['instagram'],
            Twitter: this.socialForm.value['twitter'],
            LinkedIn: this.socialForm.value['linkedin'],
            Github: this.socialForm.value['github'],
            Portfolio: this.socialForm.value['portfolio'],
            Other: this.socialForm.value['other'],
          };
          this.user.addsocial(this.socialInfo);
        }
      });
    }
  }
}
