import { Component, OnInit } from '@angular/core';

// Font Awesome
import { 
  faExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  // Iconos
  faExclamation = faExclamation;

  constructor() { }

  ngOnInit(): void {
  }

}
