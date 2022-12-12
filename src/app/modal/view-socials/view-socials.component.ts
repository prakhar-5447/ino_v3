import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { addsocial } from 'src/app/model/addsocial';
import { changesocial } from 'src/app/model/changesocial';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-socials',
  templateUrl: './view-socials.component.html',
  styleUrls: ['./view-socials.component.css'],
})
export class ViewSocialsComponent implements OnInit {
  socialForm!: FormGroup;

  socialInfo!: changesocial;
  addSocial!: addsocial;

  constructor(
    private dialog: Dialog,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private modal: ModalService
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    const socialData = this.modal.getSocial();
    if (socialData) {
      this.socialForm = new FormGroup({
        instagram: new FormControl(socialData['Instagram'], []),
        twitter: new FormControl(socialData['LinkedIn'], []),
        linkedin: new FormControl(socialData['Twitter'], []),
        github: new FormControl(socialData['Github'], []),
        portfolio: new FormControl(socialData['Portfolio'], []),
        other: new FormControl(socialData['Other'], []),
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
            Username: data.userId,
            Instagram: this.socialForm.value['instagram'],
            Twitter: this.socialForm.value['twitter'],
            LinkedIn: this.socialForm.value['linkedin'],
            Github: this.socialForm.value['github'],
            Portfolio: this.socialForm.value['portfolio'],
            Other: this.socialForm.value['other'],
          };
          this.user
            .changesocial(this.socialInfo, data.userId)
            .subscribe((Response: any) => {
              if (Response.success) {
                alert('Successfully Updated');
                this.modal.setSocial(this.socialInfo);
                this.dialog.closeAll();
              } else {
                alert(Response.msg);
              }
            });
        } else {
          this.addSocial = {
            Username: data.userId,
            Instagram: this.socialForm.value['instagram'],
            Twitter: this.socialForm.value['twitter'],
            LinkedIn: this.socialForm.value['linkedin'],
            Github: this.socialForm.value['github'],
            Portfolio: this.socialForm.value['portfolio'],
            Other: this.socialForm.value['other'],
          };
          this.user.addsocial(this.socialInfo).subscribe((Response: any) => {
            if (Response.success) {
              alert('Successfully Added');
              this.modal.setSocial(this.socialInfo);
              this.dialog.closeAll();
            } else {
              alert(Response.msg);
            }
          });
        }
      });
    }
  }
}
