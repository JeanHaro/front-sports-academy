import { Component, OnInit } from '@angular/core';

// FontAwesome
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-students-unique',
  templateUrl: './students-unique.component.html',
  styleUrls: ['./students-unique.component.scss']
})
export class StudentsUniqueComponent implements OnInit {

  // Iconos
  faChevronLeft = faChevronLeft;

  constructor() { }

  ngOnInit(): void {
  }

  toReturn() {
    history.go(-1);
  }
}
