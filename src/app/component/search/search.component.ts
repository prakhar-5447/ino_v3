import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  data: string[] = ['prakhar', 'pratham'];
  filter_list = [];
  search_user = new FormControl('');

  constructor() {}

  ngOnInit(): void {}
}
