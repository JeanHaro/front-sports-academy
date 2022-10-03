import { Component } from '@angular/core';

// Font Awesome
import { 
  faCalendarDays,
  faChevronDown,
  faListCheck,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // Iconos
  faCalendarDays = faCalendarDays;
  faChevronDown = faChevronDown;
  faListCheck = faListCheck;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  constructor () {}

  // Sidebar - Enlaces
  showNav ($event: MouseEvent) {
    let titleSchedule = document.getElementById('title-schedule');
    let titleForm = document.getElementById('title-form');
    let titleStudent = document.getElementById('title-student');

    let listSchedule = document.querySelector('.sidenav__link-schedule ul');
    let listForm = document.querySelector('.sidenav__link-form ul');
    let listStudent = document.querySelector('.sidenav__link-student ul');
    
    let element = $event.currentTarget;

    // Si element es igual a los elementos de title
    if (titleSchedule === element) {
      titleSchedule?.classList.toggle('color-white');
      listSchedule?.classList.toggle('hidden');
    }

    if (titleForm === element) {
      titleForm?.classList.toggle('color-white');
      listForm?.classList.toggle('hidden');
    }

    if (titleStudent === element) {
      titleStudent?.classList.toggle('color-white');
      listStudent?.classList.toggle('hidden');
    }
  }
}
