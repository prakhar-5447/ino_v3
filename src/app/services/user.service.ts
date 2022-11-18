import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { addsocial } from '../model/addsocial';
import { getsocial } from '../model/getsocial';
import { changesocial } from '../model/changesocial';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  addsocial(link: addsocial) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .post(this.BaseUrl + 'social', link, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          alert('Successfully Added');
        } else {
          alert(Response.msg);
        }
      });
  }

  getsocial(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<getsocial>(this.BaseUrl + 'social/' + userid, {
      headers: header,
    });
  }

  changesocial(socialData: changesocial, userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http
      .put(this.BaseUrl + 'social/' + userid, socialData, {
        headers: header,
      })
      .subscribe((Response: any) => {
        if (Response.success) {
          alert('Successfully Updated');
        } else {
          alert(Response.msg);
        }
      });
  }
}
