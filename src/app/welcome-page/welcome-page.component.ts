import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  currPageSize=12;

  //declaring the subscribers.
  subscriptions: Subscription[] = [];

  //invoking the services and formbuilder
  constructor(private getService: GetDataService,private formBuilder: FormBuilder) {}

  //calling the artworks and form initialiser
  ngOnInit() {
    this.getAllArtworks();
    this.intialiseForm();
  }


  //unsubscribing from all the subscribers which are not needed, typically the subscriber which fetched data for the first time 
  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s?.unsubscribe());
  }


  //initialising the form group and making the form group using controls 
  intialiseForm(): void {
    this.searchForm = this.formBuilder.group({
      fieldName: [''],  //tracks the searched query value
      pageIndex: [1],   //tracks the pageIndex to pass on as API query afterwards
      pageSize: [10]    //tracks the current page size ranges from 6-96
    });
   
    this.setUpFormSubscription();
  }

  //subscribing to the searched query as it returns the API link 
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

  //function which returns all the work at start 
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


  /**
   * @param: captures the event which has taken place inside mat paginator 
   */
  //tracks whether if any mat paginator element has been made to come in action
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
