import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ViewProjectComponent } from 'src/app/modal/view-project/view-project.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  follow: Boolean = false;
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

  openDialog() {
    this.dialog.open(ViewProjectComponent);
  }

  open_url(i: any) {
    console.log(i);
  }

  follow_toogle() {
    this.follow = !this.follow;
  }

  ngOnInit(): void {}
}
