import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthFormComponent } from './components/auth-form/auth-form.component';



@NgModule({
  declarations: [
    AuthFormComponent,
  ],
  exports: [
    AuthFormComponent,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule
  ],
  imports: [
    CommonModule,
    CardModule
  ]
})
export class SharedModule { }
