import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFullArtworkByIdResponse } from 'src/shared/models/Artwork';
import { GetDataService } from 'src/shared/services/artWork.service';
import { FavDataServicesService } from 'src/shared/services/fav-data.service';

@Component({
  selector: 'app-display-pane',
  templateUrl: './display-pane.component.html',
  styleUrls: ['./display-pane.component.scss']
})
export class DisplayPaneComponent {
  FetchedItem: any;
  constructor(activatedRoute: ActivatedRoute, private getServices: GetDataService, private favdataServices:FavDataServicesService) {
    activatedRoute.params.subscribe(e => {
      console.log(e['displayId']);
      this.getServices.getArtworkDetailsById(`https://api.artic.edu/api/v1/artworks/${e['displayId']}`).subscribe({
        next: (resp: GetFullArtworkByIdResponse) => {
          this.FetchedItem = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Searched Results Fetched');
        }
      })
    })
  }
  addToFavourites() {
    this.favdataServices.addFavourites(this.FetchedItem.id);
    document.getElementById('addFav').innerText='Added';
  }
}
