import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports:[
    MatPaginatorModule
  ]
})
export class MaterialModule { }
