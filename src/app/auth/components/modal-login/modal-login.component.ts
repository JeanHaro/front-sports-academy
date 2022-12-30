import { Component, Input, OnInit } from '@angular/core';

// Font Awesome
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  // Variables
  @Input() tiempo: any;
  // Iconos
  faXmark = faXmark;

  constructor() { }

  ngOnInit(): void {
    
  }

  // TODO: Cerrar modal
  cerrarModal() {
    let modal = document.getElementById('modal-auth');
    
    modal?.classList.add('animate__bounceOutLeft');
    modal?.classList.remove('animate__bounceInLeft');

    clearTimeout(this.tiempo);
  }

  timer (value: number) {
    let timer = document.getElementById('count-code');

    timer!.innerHTML = `${value}`;

    if (value == 0) {
      alert('Tiempo concluido!');
    } else {
      value--;

      clearTimeout(this.tiempo);

      this.tiempo = setTimeout(() => {
        this.timer(value)
      }, 1000);
    }
  }
}
