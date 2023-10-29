import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayPaneComponent } from '../app/display-pane/display-pane.component';
import { SinglePaneComponent } from './components/single-pane/single-pane.component';

@NgModule({
  declarations: [
    DisplayPaneComponent,
    SinglePaneComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
