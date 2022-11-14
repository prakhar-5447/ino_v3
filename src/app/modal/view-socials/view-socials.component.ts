import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-socials',
  templateUrl: './view-socials.component.html',
  styleUrls: ['./view-socials.component.css'],
})
export class ViewSocialsComponent implements OnInit {
  social!: FormGroup;

  constructor() {
    this.social = new FormGroup({
      instagram: new FormControl('', [Validators.required]),
      twitter: new FormControl('', [Validators.required]),
      linkedin: new FormControl('', [Validators.required]),
      github: new FormControl('', [Validators.required]),
      portfolio: new FormControl('', [Validators.required]),
      other: new FormControl('', []),
    });
  }

  ngOnInit(): void {}
  
  send() {
    console.log('data send');
  }
}
