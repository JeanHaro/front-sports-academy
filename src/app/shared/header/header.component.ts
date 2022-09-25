import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.scroll()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scroll()
  }

  // Cambia del color del header aldarle click
  headerFocus() {
    let header = document.querySelector('.header');

    header?.classList.toggle('header-on');
  }

  // Ejecuta la acción y detecta la posición del scroll
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

    if (innerWidth >= 768) {
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

    // Cambia el color del header al dar scroll, mediante la clase
    if (innerWidth < 768) {
      (valor > 54) ?  header?.classList.add('header__scroll') : header?.classList.remove('header__scroll');
    } else {
      (valor > 198) ? header?.classList.add('header__scroll') : header?.classList.remove('header__scroll');
    }
    
  }
}
