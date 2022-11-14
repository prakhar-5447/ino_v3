import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.css'],
})
export class FollowedComponent implements OnInit {
  index = [1, 2, 3, , 5, 6, 7, 8, 9, 10];
  constructor() {}

  ngOnInit(): void {}
}
