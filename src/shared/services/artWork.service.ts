import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllArtworksResponse, GetArtworksByQueryResponse, GetFullArtworkByIdResponse } from '../models/Artwork';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  apiUrl = 'https://api.artic.edu/api/v1/artworks';
  apiFields = '?fields=id,title,artist_display,date_display,main_reference_number';
  constructor(private http: HttpClient) {
  }


  /**
   * 
   * @param pageNo API query to be sent for page number
   * @param limit API query to be sent for the number of items per page
   */
  //fetched the info firsthand to be shown on the page
  getArtworks(pageNo: number, limit: number): Observable<GetAllArtworksResponse> {
    return this.http.get<GetAllArtworksResponse>(`${this.apiUrl}?page=${pageNo}&limit=${limit}`);
  }

  /**
   * 
   * @param searchString takes up the query value to be searched
   * @param pageNo API query to be sent for page number
   * @param limit API query to be sent for the number of items per page
   * @returns a observable that has all artwork related info including the API link or a particular artwork
   */
  //returns the artworks which satisfies the given query
  getSearchedArtworks(searchString: string, pageNo: number, limit: number): Observable<GetArtworksByQueryResponse> {
    if(searchString==='')
    return this.http.get<GetArtworksByQueryResponse>(`${this.apiUrl}?page=${pageNo}&limit=${limit}`);
    return this.http.get<GetArtworksByQueryResponse>(`${this.apiUrl}/search?q=${searchString}?page=${pageNo}&limit=${limit}`);
  }

  /**
   * 
   * @param link to be passed consisting the endpoint as the id 
   * @returns 
   */
  //returns the artwork which corresponds to a particular passed ID
  getArtworkDetailsById(link: string): Observable<GetFullArtworkByIdResponse> {
    return this.http.get<GetFullArtworkByIdResponse>(`${link}`);
  }
}