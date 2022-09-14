import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'form/:Id' , component: FormComponent},
      {path: 'form' , component: FormComponent},

      
  ])
  ],
  declarations: [FormComponent]
})
export class FormModule { }
