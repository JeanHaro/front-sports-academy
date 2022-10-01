import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Valores de los select
  valores = {
    valueAge: '',
    valueTurn: '',
    valueHour: '',
  }

  // Entregará los valores que se seleccione en el select
  viewSelect (age: string, turn: string, hour: string) {
    this.valores.valueAge = age;
    this.valores.valueTurn = turn;
    this.valores.valueHour = hour;

    let inputAge = document.querySelector('.form__register-age input');
    let inputTurn = document.querySelector('.form__register-turn input');
    let inputHour = document.querySelector('.form__register-hour input');

    // Si el valor no es vacío
    if (this.valores.valueAge != '') inputAge?.classList.add('border-orange');
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
    if (this.valores.valueHour != '') inputHour?.classList.add('border-orange');
  }

  // Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    let selectAge = document.querySelector('.form__register-age');
    let selectTurn = document.querySelector('.form__register-turn');
    let selectHour = document.querySelector('.form__register-hour');
    
    // Etiqueta
    let valorObject = $event.currentTarget;
    // Si la etiqueta es igual al elemento
    if (valorObject === selectAge) selectAge?.classList.toggle('active');
    if (valorObject === selectTurn) selectTurn?.classList.toggle('active');
    if (valorObject === selectHour) selectHour?.classList.toggle('active');
  }
}
