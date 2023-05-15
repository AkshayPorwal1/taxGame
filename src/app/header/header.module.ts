import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderLabelComponent } from './header-label/header-label.component';
import { MaterialImportModule } from '../common/material-import.module';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLabelComponent
  ],
  imports: [
    CommonModule,
    MaterialImportModule
  ],
  exports: [
    HeaderComponent,
    HeaderLabelComponent
  ]
})
export class HeaderModule { }
