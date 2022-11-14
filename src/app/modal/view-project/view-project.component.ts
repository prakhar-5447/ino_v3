import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  title = 'My Project';
  descripion =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio dolore exercitationem. Harum cumque dolorem hic commodi ducimus atque provident unde excepturi quam. Sequi ipsam repellendus dolor nesciunt cumque adipisci architecto rerum ipsa labore ratione similique quisquam consequatur quae deleniti praesentium, doloremque reprehenderit recusandae commodi autem quod perspiciatis optio repudiandae. Expedita rerum excepturi libero vitae quo, voluptatibus eum reiciendis beatae inventore. Consequatur fugit laborum reiciendis? Dolorem eaque tempora officiis, illum omnis ut qui! Labore, dignissimos. Voluptates quibusdam numquam doloremque sapiente doloribus adipisci ab corrupti, a ea necessitatibus error molestias sit vel nostrum odio, sunt blanditiis est amet quam earum! Quaerat.';
  link = 'https://pratham-0094.github.io/angular-portfolio';
  tech = ['html', 'css', 'javascript', 'react', 'angular', 'mongodb'];

  constructor() {}

  ngOnInit(): void {}
}
