import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Valores de los select
  valores = {
    valueTurn: ''
  }

  // Entregará los valores que se seleccione en el select
  viewSelect (turn: string) {
    this.valores.valueTurn = turn;

    let inputTurn = document.querySelector('.form__admin-turn input');

    // Si el valor no es vacío
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
  }

  // Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    let selectTurn = document.querySelector('.form__admin-turn');
    
    selectTurn?.classList.toggle('active');
  }
}
