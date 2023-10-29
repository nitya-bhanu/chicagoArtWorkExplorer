import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { GetFullArtworkByIdResponse } from 'src/shared/models/Artwork';
import { GetDataService } from 'src/shared/services/artWork.service';
import { FavDataServicesService } from 'src/shared/services/fav-data.service';
import { Router } from '@angular/router';

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

  fillHeart(id){
    console.log('working');
    const x=document.getElementById(`${id}-hrt-icon`);
    console.log('here: ',x);
    x.classList.replace('bi-heart', 'bi-heart-fill');
    this.favDataService.addFavourites(id);
  }

  removeFromFav(id: string): void {
    this.removeClicked.emit(id);
  }

    // FetchItem:GetFullArtworkByIdResponse['data'];
  // constructor(private getServices:GetDataService){}
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.getServices.getArtworkDetailsById(changes['FetchedItems'].currentValue.api_link).subscribe({
  //     next: (resp:GetFullArtworkByIdResponse ) => {
  //       this.FetchItem = resp.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('Searched Results Fetched');
  //     }
  //   });;
  //   throw new Error('Method not implemented.');
  // }

}
