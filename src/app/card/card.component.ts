import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { GetFullArtworkByIdResponse } from 'src/shared/models/Artwork';
import { GetDataService } from 'src/shared/services/artWork.service';
import { FavDataServicesService } from 'src/shared/services/fav-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() FetchedItems: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() type: string = 'card';

  @Output() removeClicked: EventEmitter<string> = new EventEmitter<string>();
  FetchedItem: any;
  //trying something else 

  isArtworkDataLoading = false;
  constructor(private getDataService: GetDataService,private favDataService:FavDataServicesService) { }

  ngOnInit(): void {
      console.error(this.FetchedItems);
      this.updateData(this.FetchedItems);
  }

  /**
   * 
   * @param items takes up the information of item to be saved to 
   */
  // some other function that uses the FetchedItems input
  updateData(items) {
    console.log(items);
    this.isArtworkDataLoading = true;
    this.getDataService.getArtworkDetailsById(`${items.api_link}`).subscribe({
      next: (resp: GetFullArtworkByIdResponse) => {
        this.FetchedItem = resp.data;
         this.isArtworkDataLoading = false;
      },
      error: (err) => {
        console.log(err);
         this.isArtworkDataLoading = false;
      },
      complete: () => {
        console.log('Searched Results Fetched');
       
      }
    })
  }

  /**
   * 
   * @param id to be passed as a string, icon id of the card to be filled
   */
  //changes the heart from unfilled to filled
  fillHeart(id:string){
    console.log('working');
    const x=document.getElementById(`${id}-hrt-icon`);
    console.log('here: ',x);
    x.classList.replace('bi-heart', 'bi-heart-fill');
    this.favDataService.addFavourites(id);
  }

  /**
   * 
   * @param id takes up the id in string format, of the data whose info needs to be removed from favourites
   */
  //removes the item from favourite
  removeFromFav(id: string): void {
    this.removeClicked.emit(id);
  }
}
