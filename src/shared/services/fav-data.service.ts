import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavDataServicesService {
  favouritesIdRecords: Array<string>;
  constructor() {
    let p = sessionStorage.getItem("favIds");
    if (p) {
      this.favouritesIdRecords = JSON.parse(p);
    };
  }
  addFavourites(id: any) {
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
  removeFavourites(id: any) {
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
