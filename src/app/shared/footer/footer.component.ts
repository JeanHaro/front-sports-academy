import { Component, OnInit } from '@angular/core';

// Font Awesome
import { 
  faLocationDot,
  faEnvelope,
  faPhone,
  faMonument,
} from '@fortawesome/free-solid-svg-icons';

import { 
  faSquareWhatsapp,
  faSquareFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Iconos
  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faSquareWhatsapp = faSquareWhatsapp;
  faSquareFacebook = faSquareFacebook;
  faInstagram = faInstagram;

  // Variables
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
