import { Component } from '@angular/core';
import { AUTHORS } from './mock-authors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent {
  authors = AUTHORS;
}
