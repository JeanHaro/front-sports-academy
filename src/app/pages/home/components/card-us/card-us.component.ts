import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-us',
  templateUrl: './card-us.component.html',
  styleUrls: ['./card-us.component.scss']
})
export class CardUsComponent implements OnInit {

  @Input() img!: string;
  @Input() title!: string;
  @Input() altImage!: string;
  @Input() description!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
