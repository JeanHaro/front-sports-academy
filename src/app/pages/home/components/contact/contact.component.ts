import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Variable
  valor = '';

  viewSelect (a: string) {
    this.valor = a;
  }

  // Añadir la clase de active cuando se le de click
  selectClick() {
    let select = document.querySelector('.contact__form-affair');

    select?.classList.toggle('active');
  }

}
