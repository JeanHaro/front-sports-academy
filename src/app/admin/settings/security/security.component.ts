import { Component, OnInit } from '@angular/core';

// Interfaces
import { AdminForm } from 'src/app/interfaces/admin-form.interface';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  // Variables
  admin!: AdminForm;
  code: boolean = false;
  

  constructor (private adminService: AdminService) { }

  ngOnInit(): void { 
    this.obtenerAdmin();
  }

  // TODO: Obtener admin
  obtenerAdmin() {
    this.adminService.getAdmin()
    .subscribe({
      next: (adm) => {
        const valor = Object.entries(adm);
        this.admin = valor[1][1];
        this.code = this.admin.code;
        
        const check_auth = document.getElementById('double-authentication');

        if (this.code) check_auth?.setAttribute('checked', 'true');
      }
    })
  }

  // TODO: Abrir modal
  abrirModal() {
    let modal = document.getElementById('modal-pass');
    
    modal?.classList.remove('animate__bounceOutLeft');
    modal?.classList.remove('hidden');
    modal?.classList.add('animate__bounceInLeft');
  }

  // TODO: Enviar Check
  obtenerCheck (e: any) {    
    if (e.target.checked) return this.code = true;
      
    return this.code = false;
  }
}
