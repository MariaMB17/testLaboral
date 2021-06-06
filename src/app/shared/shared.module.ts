import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { SPThemeSharedModule } from '@SPtheme/shared.module'
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    ChartsModule,
    SPThemeSharedModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ChartsModule,
    SPThemeSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
