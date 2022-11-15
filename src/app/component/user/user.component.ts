import { Component, OnInit } from '@angular/core';
import { AddProjectComponent } from 'src/app/modal/add-project/add-project.component';
import { Dialog } from '@angular/cdk/dialog';
import { ViewProjectComponent } from 'src/app/modal/view-project/view-project.component';
import { ViewSocialsComponent } from 'src/app/modal/view-socials/view-socials.component';

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
  project: any[] = [1, 2, 3, , 5, 6, 7, 8, 9, 10];
  socials = [1, 2, 3, 4, 5, 6];

  constructor(public dialog: Dialog) {
    this.name = 'pratham sahu';
    this.phone_no = '+91 8349378115';
    this.email = 'sahupratham022003@gmail.com';
    this.description =
      'jdlkasjd sdjasldj askdjaskldj sjdkj sjdksjd asjdksj skjdakasjdsaad sakd sajdksajsa d d skajd k akjdk jk lk k j k jfkjfkf dkj kfjkdfj kjfkdjf akdfjaldja adjaksdj ad askdjakslj aada skdjaslk adjaksdjalkjd adaksjda sd adajdlajd a kjsdlajs asjldaj saskdjalksjd aaa sdkjaldja  askdjaljdas kdjalsdja d asdjlkasjdlkasa dasjdlkaj sd akdjald asjd kasjd asd aksjdlaksdas dalsjdlaksjdas dad jaslkd s adkasjdlkasjd ajdas jd alsjdalskd kdjlas ds dsl d lsj dlksajad s dksajadlkajds  sdjasldj asakdsa dsjaldkjsada sda sldjaslkdja sdas d asdkjalskjdaksl d asa dklasjdkljddjalksjd aa dlajdlkasjdkasjd lkasja sda ';
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
