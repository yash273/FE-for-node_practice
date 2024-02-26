import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http : HttpClient
  ) { }

  getLocation( url : string){
    return this.http.get(environment.url + 'location/' + url);
  }
}
