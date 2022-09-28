import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Font Awesome
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Iconos
  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }
}
