import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Componentes
import { AppComponent } from './app.component';

// Componentes - NoPageFound
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
