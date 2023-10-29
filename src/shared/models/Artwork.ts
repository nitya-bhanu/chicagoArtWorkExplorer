import { GenericResponse } from "./GenericResponse";


//interface for all the data fetched in the start 
interface GetAllArtworksData {
    id: number;
    api_link: string;
    description: string;
    title: string;
    artist_display: string;
    place_of_origin: string;
    image_id: string;
}
export interface GetAllArtworksResponse extends GenericResponse {
    data: GetAllArtworksData;
}


//interface for the searched artwork fecthed
interface GetArtworksByQueryData {
    id: string;
    api_link: string;
    title: string;
}
export interface GetArtworksByQueryResponse extends GenericResponse {
    data: GetArtworksByQueryData
}


//interface for the single more artwork clicked
interface GetFullArtworkByIdData {
    id: string;
    image_id: string;
    title: string;
    description: string;
    artist_display: string;
    place_of_origin: string;
}
export interface GetFullArtworkByIdResponse extends GenericResponse {
    data: GetFullArtworkByIdData
}

