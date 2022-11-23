import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { AuthService } from 'src/app/services/auth.service';
import { login } from 'src/app/model/login';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  userArray: any[] = [];

  constructor(
    private dialog: Dialog,
    private router: Router,
    private follow: FollowService,
    private auth: AuthService
  ) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.searchForm = new FormGroup({
      searchuser: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  view(id: String) {
    this.router.navigateByUrl('view/' + id);
    this.dialog.closeAll();
  }

  search() {
    if (this.searchForm.valid) {
      this.follow
        .searchname(this.searchForm.value['searchuser'])
        .subscribe((Response: any) => {
          this.userArray = this.userArray.concat(Response.msg);
        });
      this.follow
        .searchusername(this.searchForm.value['searchuser'])
        .subscribe((Response: any) => {
          this.userArray = this.userArray.concat(Response.msg);
        });
    }
  }
}
