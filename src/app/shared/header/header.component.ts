import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Router, Event, NavigationEnd } from '@angular/router';

// Font Awesome
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  // Iconos
  faList = faList;

  // Variables 
  nombreRuta!: string;

  constructor (private router: Router) {
    // Obtener la ruta
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.nombreRuta = event.url; // url
      }
    })
  }

  // Ejecuta el metodo al iniciar
  ngOnInit(): void {
    this.scroll();
  }

  // Ver los nuevos cambios
  ngOnChanges(changes: SimpleChanges): void {
    this.scroll();
  }

  // Cambia del color del header al abrir el menuBar - Mobile
  headerFocus() {
    let header = document.querySelector('.header');

    header?.classList.toggle('header-on');
  }

  // Ejecuta la acción actionScroll y detecta la posición del scroll
  scroll() {
    let numberScroll = 0;
    let ticking = false;

    document.addEventListener('scroll', (e) => {
      numberScroll = window.scrollY;
    
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.actionScroll(numberScroll);

          ticking = false;
        });
    
        ticking = true;
      }
    });
  }

  // Acción al dar el scroll
  actionScroll (valor: number) {
    // Elementos
    const header = document.querySelector('.header');
    const enlaces = document.querySelectorAll('.header__navigation a');
    const inicio = document.getElementById('inicio');
    const nosotros = document.getElementById('nosotros');

    // Pantallas mayor e igual de 768 y no está en la ruta /form
    if (innerWidth >= 768 && this.nombreRuta != "/form") {
      if (valor > 0) {
        enlaces[0].classList.add('active');
        enlaces[1].classList.remove('active');
        enlaces[2].classList.remove('active');
      } 

      if (valor > inicio!.scrollHeight - 300) {
        enlaces[0].classList.remove('active');
        enlaces[1].classList.add('active');
        enlaces[2].classList.remove('active');
      } 

      if (valor > (inicio!.scrollHeight + nosotros!.scrollHeight)) {
        enlaces[0].classList.remove('active');
        enlaces[1].classList.remove('active');
        enlaces[2].classList.add('active');
      }
    }

    // Cambia el color del header al dar scroll
    // Si la ruta no es /form
    if (this.nombreRuta != "/form") {
      // Si la pantalla es menor a 768
      if (innerWidth < 768) {
        (valor > 54) ?  header?.classList.add('header__scroll') : header?.classList.remove('header__scroll');
      } else {
        (valor > 198) ? header?.classList.add('header__scroll') : header?.classList.remove('header__scroll');
      }
    } else {
      (valor > 48) ? header?.classList.add('header__scroll') : header?.classList.remove('header__scroll');
    }
  }
}
