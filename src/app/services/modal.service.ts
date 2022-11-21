import { Injectable } from '@angular/core';
import { getsocial } from '../model/getsocial';
import { project } from '../model/project';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  projectData!: project[];
  socialData!: getsocial;
  index!: any;
  followList!: any;

  constructor(private auth: AuthService) {}

  setSocial(data: getsocial) {
    this.socialData = data;
  }

  getSocial() {
    return this.socialData;
  }

  setProject(data: project[]) {
    this.projectData = data;
  }

  getProject() {
    return this.projectData;
  }

  getProjectDetail() {
    return this.projectData[this.index];
  }

  setIndex(index: any) {
    this.index = index;
  }

  deleteProject() {
    this.projectData.splice(this.index, 1);
  }

  setFollowList(list: any) {
    this.followList = JSON.parse(list);
  }

  getFollowList() {
    return this.followList;
  }
}
