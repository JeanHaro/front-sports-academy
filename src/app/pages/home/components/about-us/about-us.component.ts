import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  // Nosotros
  nosotros = [{
      title: 'Misión',
      image: '../../../../assets/img/mision.png',
      altImage: 'Icono de misión',
      description: `Establecer una metodología integral, bien diseñada para el bienestar de los menores que aspiran al aprender los conceptos del fútbol, respetando 
      el derecho formativo.`
    },
    {
      title: 'Visión',
      image: '../../../../assets/img/vision.png',
      altImage: 'Icono de visión',
      description: `Ser reconocida como la mejor escuela formativa de fútbol en Lima Norte, por su calidad en el servicio y metodología global; alcanzando una formación integral
      y competitiva del menor.`
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
