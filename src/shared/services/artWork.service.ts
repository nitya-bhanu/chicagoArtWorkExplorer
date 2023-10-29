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

  getArtworks(pageNo: number, limit: number): Observable<GetAllArtworksResponse> {
    return this.http.get<GetAllArtworksResponse>(`${this.apiUrl}?page=${pageNo}&limit=${limit}`);
  }

  getSearchedArtworks(searchString: string, pageNo: number, limit: number): Observable<GetArtworksByQueryResponse> {
    return this.http.get<GetArtworksByQueryResponse>(`${this.apiUrl}/search?q=${searchString}?page=${pageNo}&limit=${limit}`);
  }

  getArtworkDetailsById(link: string): Observable<GetFullArtworkByIdResponse> {
    return this.http.get<GetFullArtworkByIdResponse>(`${link}`);
  }
}