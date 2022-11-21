import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { project } from 'src/app/model/project';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  projectData!: project;

  constructor(
    private dialog: Dialog,
    private router: Router,
    private auth: AuthService,
    private modal: ModalService,
    private project: ProjectService
  ) {
    this.projectData = this.modal.getProjectDetail();
  }

  ngOnInit(): void {}

  deleteProject(id: any) {
    const data = this.auth.checkAuth();
    if (!data.success) {
      this.router.navigateByUrl('/login');
    }
    this.project.deleteproject(data.userId, id).subscribe((Response: any) => {
      if (Response.success) {
        this.modal.deleteProject();
        this.dialog.closeAll();
      }
    });
  }
}
