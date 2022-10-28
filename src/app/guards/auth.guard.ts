import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

// Rxjs
import { tap } from 'rxjs'; 

// Servicios
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private adminService: AdminService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.adminService.validarToken().pipe(
      tap ( estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
  
}
