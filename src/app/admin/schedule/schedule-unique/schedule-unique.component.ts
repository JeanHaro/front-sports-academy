import { Component, OnInit } from '@angular/core';

// FontAwesome
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule-unique',
  templateUrl: './schedule-unique.component.html',
  styleUrls: ['./schedule-unique.component.scss']
})
export class ScheduleUniqueComponent implements OnInit {

  // Iconos
  faChevronLeft = faChevronLeft;
  
  constructor () { 
  }

  ngOnInit(): void {
  }

  toReturn() {
    history.go(-1);
  }
}
