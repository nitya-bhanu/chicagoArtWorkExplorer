import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavDataServicesService {
  favouritesIdRecords: Array<string>;
  constructor() {
    const p = sessionStorage.getItem("favIds");
    if (p) {
      this.favouritesIdRecords = JSON.parse(p);
    }
  }
  /**
   * 
   * @param id artwork ID to be passed a string
   */
  //adds the artwork's id to the favourite array
  addFavourites(id: string) {
    let x: string[] = [];
    const favIds = sessionStorage.getItem("favIds");
    if (favIds) {
      x = JSON.parse(favIds);
    }
    x.push(id);
    this.favouritesIdRecords = x.slice();
    sessionStorage.setItem("favIds", JSON.stringify(x));
    console.log(x);
  }

  /**
   * 
   * @param id takes up the id of artwork to be rmeoved
   */
  //removes the artwork id from favourites array that is no longer needed
  removeFavourites(id: string) {
    let x: string[] = [];
    const favIds = sessionStorage.getItem("favIds");
    if (favIds) {
      x = JSON.parse(favIds);
    }
    x = x.filter(e => { return e != id });
    this.favouritesIdRecords = x.slice();
    sessionStorage.setItem("favIds", JSON.stringify(x));
    console.log(x);
  }
}
