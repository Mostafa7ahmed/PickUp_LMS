import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ReativeFormModule { }
