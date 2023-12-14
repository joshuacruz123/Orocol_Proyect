import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular material
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Modal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//endpoint
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //http
    HttpClientModule
  ],
  // Exportar modulos y modals
  exports: [
    
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ] 
})
export class SharedModule { }
