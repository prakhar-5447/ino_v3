import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { project } from '../model/project';
import { addproject } from '../model/addproject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  BaseUrl: String = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) {}

  addproject(project: addproject) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.post(this.BaseUrl + 'project', project, {
      headers: header,
    });
  }

  getproject(userid: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.get<project>(this.BaseUrl + 'project/' + userid, {
      headers: header,
    });
  }

  deleteproject(userid: String, id: String) {
    const header = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.delete(
      this.BaseUrl + 'project/' + userid + '/' + id,
      {
        headers: header,
      }
    );
  }
}
