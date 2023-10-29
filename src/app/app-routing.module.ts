import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DisplayPaneComponent } from './display-pane/display-pane.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {
    path:"",
    component:WelcomePageComponent
  },
  {
    path:"display/:displayId",
    component:DisplayPaneComponent
  },
  {
    path:"favourites",
    component:FavouritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
