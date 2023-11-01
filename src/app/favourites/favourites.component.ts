import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavDataServicesService } from 'src/shared/services/fav-data.service';
import { GetDataService } from 'src/shared/services/artWork.service';
import { GetFullArtworkByIdResponse } from 'src/shared/models/Artwork';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  artWork: any = [];
  currPageIndex = 1;
  currPageSize = 10;
  FetchedItems: any = [];
  favIds: Array<string>;

  //subscribing to the favourtite service 
  subscriptions: Subscription[] = [];
  constructor(private getService: GetDataService, private getFavService: FavDataServicesService) {
    this.favIds = this.getFavService.favouritesIdRecords;
  }

  ngOnInit() {
    
      this.favIds.forEach(e => {
        this.getService.getArtworkDetailsById(`https://api.artic.edu/api/v1/artworks/${e}`).subscribe({
          next: (resp: GetFullArtworkByIdResponse) => {
            this.FetchedItems.push(resp.data);
          },
          error: (err) => {
            console.log('Here is the error: ', err);
          },
          complete: () => {
            console.log('Succesful fetching');
          }
        })
      })
  }

  /**
   * 
   * @param id takes the input id to match through and delete from favourites array
   */
  //removes the id from favourites user services array
  removeFromFav(id: string) {
    this.getFavService.removeFavourites(id);
    this.favIds = this.getFavService.favouritesIdRecords;
    location.reload();
  }
}
