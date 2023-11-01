import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GetFullArtworkByIdResponse } from 'src/shared/models/Artwork';
import { GetDataService } from 'src/shared/services/artWork.service';
import { FavDataServicesService } from 'src/shared/services/fav-data.service';
import { MatDialog } from '@angular/material/dialog';
export interface DialogData {
  metaInfo:any;
}
@Component({
  selector: 'app-display-pane',
  templateUrl: './display-pane.component.html',
  styleUrls: ['./display-pane.component.scss']
})
export class DisplayPaneComponent {
  FetchedItem: any;

  /**
   * 
   * @param activatedRoute fetches the property of activated route
   * @param getServices gets the fetched APIs Info for the artworks
   * @param favdataServices gets the API result to call the favourite srtworkd
   * @param dialog used to open dialog which in turn enables user to view meta data.
   */  
  constructor(activatedRoute: ActivatedRoute, private getServices: GetDataService, private favdataServices:FavDataServicesService,public dialog:MatDialog) {
    activatedRoute.params.subscribe(e => {
      console.log(e['displayId']);
      this.getServices.getArtworkDetailsById(`https://api.artic.edu/api/v1/artworks/${e['displayId']}`).subscribe({
        next: (resp: GetFullArtworkByIdResponse) => {
          this.FetchedItem = resp.data;
          console.log(this.FetchedItem);
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

  //adds the data to be saved in the fav 
  addToFavourites() {
    this.favdataServices.addFavourites(this.FetchedItem.id);
    document.getElementById('addFav').innerText='Added';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openDialog(){
    this.dialog.open(MetaDataDialogComponent, {
      data: {
        metaInfo: this.FetchedItem,
      },
    });
  }
}

@Component({
  selector: 'app-meta-data-dialog',
  templateUrl: 'meta-data.html',
  standalone: true,
  imports: [MatDialogModule, NgIf],
})
export class MetaDataDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}