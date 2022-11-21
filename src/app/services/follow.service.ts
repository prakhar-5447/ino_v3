import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  follow(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    this.http.post(
      this.BaseUrl + 'follow',
      { Username: userid, Followed: [] },
      {
        headers: header,
      }
    );
  }

  getfollow(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<any>(this.BaseUrl + 'follow/' + userid, {
      headers: header,
    });
  }

  changefollow(data: any, userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.put(this.BaseUrl + 'follow/' + userid, data, {
      headers: header,
    });
  }
}
