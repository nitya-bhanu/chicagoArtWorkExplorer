import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { GetAllArtworksResponse, GetArtworksByQueryResponse } from 'src/shared/models/Artwork';
import { GetDataService } from 'src/shared/services/artWork.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  title = 'chicagoArt';
  artWork: any = [];
  searchForm: FormGroup;
  currPageIndex=1;
  currPageSize=10;

  subscriptions: Subscription[] = [];
  constructor(private getService: GetDataService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getAllArtworks();
    this.intialiseForm();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s?.unsubscribe());
  }

  intialiseForm(): void {
    this.searchForm = this.formBuilder.group({
      fieldName: [''],
      pageIndex: [1],
      pageSize: [10]
    });
   
    this.setUpFormSubscription();
  }

  setUpFormSubscription(): void {
    const formSubscription = this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(e => {
      const artworkSub = this.getService.getSearchedArtworks(e.fieldName,this.currPageIndex,this.currPageSize).subscribe({
        next: (resp: GetArtworksByQueryResponse) => {
          this.artWork = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Searched Results Fetched');
        }
      });

      this.subscriptions.push(artworkSub);
      console.log('searched result: ',this.artWork);
    });

    this.subscriptions.push(formSubscription);
  }

  getAllArtworks(): void {
    this.getService.getArtworks(this.currPageIndex,this.currPageSize).subscribe({
      next: (resp: GetAllArtworksResponse) => {
        console.log(resp.data);
        this.artWork = resp.data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Response received!');
      }
    });
  }

  handPageChange(e:any){
    this.currPageIndex=e.pageIndex+1;
    this.currPageSize=e.pageSize;
    this.searchForm.setValue({
      fieldName: this.searchForm.value.fieldName,
      pageIndex: this.currPageIndex,
      pageSize: this.currPageSize
    });
  }
}
