import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { addproject } from 'src/app/model/addproject';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tech: string[] = [];
  technology = new FormControl('');
  photoImage!: String;
  projectInfo!: addproject;
  url: any;
  imageUrl!: String;

  constructor(
    public dialog: Dialog,
    private router: Router,
    private auth: AuthService,
    private project: ProjectService
  ) {
    this.projectForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      technology: this.technology,
      desc: new FormControl('', [Validators.required]),
      link: new FormControl('', []),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tech.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.technology.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tech.indexOf(fruit);
    if (index >= 0) {
      this.tech.splice(index, 1);
    }
  }

  ngOnInit(): void {}

  @ViewChild('fileInput') fileInput: any;

  send() {
    if (this.projectForm.valid) {
      let techList: any = this.tech;
      techList = techList.map((element: String) => {
        return { name: element };
      });
      const formData = new FormData();
      const fi = this.fileInput.nativeElement;
      const fileToUpload = fi.files[0];

      formData.append('file', fileToUpload);
      this.auth.uploadImage(formData).subscribe((Response: any) => {
        this.photoImage = Response.msg;
        const data = this.auth.checkAuth();
        if (!data.success) {
          this.router.navigateByUrl('/login');
        }
        this.projectInfo = {
          Username: data.userId,
          Title: this.projectForm.value['title'],
          Description: this.projectForm.value['desc'],
          ProjectImage: this.photoImage,
          Url: this.projectForm.value['link'],
          Technology: techList,
        };
        this.project.addproject(this.projectInfo).subscribe((Response: any) => {
          if (Response.success) {
            alert('Successfully Added');
            this.router.navigateByUrl('/');
            this.dialog.closeAll();
          } else {
            alert(Response.msg);
          }
        });
      });
    }
  }

  file_selected(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
