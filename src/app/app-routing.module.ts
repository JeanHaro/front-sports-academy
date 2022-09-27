import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Quicklink
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

// Componente - NoPageFound
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Routing
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { AdminRoutingModule } from './admin/admin.routing';

const routes: Routes = [
  // 404 - Not found
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy
    }),
    PagesRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
