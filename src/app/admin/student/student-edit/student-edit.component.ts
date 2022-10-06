import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    // Valores de los select
    valores = {
      valuePayOne: 'No Pagado',
      valuePayTwo: 'No Pagado',
      valuePayThree: 'No Pagado',
      valuePayFour: 'No Pagado'
    }
  
    // Entregará los valores que se seleccione en el select
    viewSelect (
      payOne: string = this.valores.valuePayOne, 
      payTwo: string = this.valores.valuePayTwo, 
      payThree: string = this.valores.valuePayThree, 
      payFour: string = this.valores.valuePayFour
    ) {
      
      this.valores.valuePayOne = payOne;
      this.valores.valuePayTwo = payTwo;
      this.valores.valuePayThree = payThree;
      this.valores.valuePayFour = payFour;
  
      let inputPayOne = document.querySelector('.form__admin-payOne input');
      let inputPayTwo = document.querySelector('.form__admin-payTwo input');
      let inputPayThree = document.querySelector('.form__admin-payThree input');
      let inputPayFour = document.querySelector('.form__admin-payFour input');
  
      // Si el valor no es vacío
      if (this.valores.valuePayOne != '') inputPayOne?.classList.add('border-orange');
      if (this.valores.valuePayTwo != '') inputPayTwo?.classList.add('border-orange');
      if (this.valores.valuePayThree != '') inputPayThree?.classList.add('border-orange');
      if (this.valores.valuePayFour != '') inputPayFour?.classList.add('border-orange');
    }
  
    // Añadir la clase de active al contenedor de los select, cuando se le de click
    selectClick($event: Event) {
      let selectPayOne = document.querySelector('.form__admin-payOne');
      let selectPayTwo = document.querySelector('.form__admin-payTwo');
      let selectPayThree = document.querySelector('.form__admin-payThree');
      let selectPayFour = document.querySelector('.form__admin-payFour');
  
      // Etiqueta
      let valorObject = $event.currentTarget;
      // Si la etiqueta es igual al elemento
      if (valorObject === selectPayOne) selectPayOne?.classList.toggle('active');
      if (valorObject === selectPayTwo) selectPayTwo?.classList.toggle('active');
      if (valorObject === selectPayThree) selectPayThree?.classList.toggle('active');
      if (valorObject === selectPayFour) selectPayFour?.classList.toggle('active');
    }
}
