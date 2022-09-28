import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './components/nopagefound.component';

// Routing
import { NoPageFoundRoutingModule } from './nopagefound.routing';

@NgModule({
  declarations: [
    NopagefoundComponent 
  ],
  imports: [
    CommonModule,
    NoPageFoundRoutingModule
  ]
})
export class NopagefoundModule { }
