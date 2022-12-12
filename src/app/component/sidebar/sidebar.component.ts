import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowedComponent } from '../followed/followed.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: Dialog, private router: Router) {}

  ngOnInit(): void {}
  openDialog_followed() {
    this.dialog.open(FollowedComponent);
  }
  openDialog_search() {
    this.dialog.open(SearchComponent);
  }
  log_out() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
