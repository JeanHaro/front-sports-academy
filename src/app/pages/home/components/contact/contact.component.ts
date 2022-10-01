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
  valores = {
    valueAffairs: ''
  }

    // Entregará los valores que se seleccione en el select
  viewSelect (affairs: string) {
    this.valores.valueAffairs = affairs;
    
    let inputAffairs = document.querySelector('.contact__form-affair input');

    // Si el valor no es vacío
    if (this.valores.valueAffairs != '') inputAffairs?.classList.add('border-orange');
  }

  // Añadir la clase de active cuando se le de click
  selectClick ($event: Event) {
    let selectAffairs = document.querySelector('.contact__form-affair');

    // Etiqueta
    let valorObject = $event.currentTarget;
    // Si la etiqueta es igual al elemento
    if (valorObject === selectAffairs) selectAffairs?.classList.toggle('active');
  }

}
