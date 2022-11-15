import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FollowedComponent } from '../followed/followed.component';
import { SearchComponent } from '../search/search.component';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: Dialog) {}

  ngOnInit(): void {}
  openDialog_followed() {
    this.dialog.open(FollowedComponent);
  }
  openDialog_search() {
    this.dialog.open(SearchComponent);
  }
  openDialog_setting() {
    this.dialog.open(SettingComponent);
  }
}
