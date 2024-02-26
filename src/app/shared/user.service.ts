import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  executeUserService(data : any, url : string){
    return this.http.post(environment.url + 'user/' + url, data);
  }

  executeGetUserService( url : string){
    return this.http.get(environment.url + 'user/' + url);
  }

  executeGetPaginatedUserService( url : string){
    return this.http.get(environment.url + url);
  }

  getUserById(userId: number) {
    return this.http.get(environment.url + `user/${userId}`);
  }

  updateUser(data: any, userId: number) {
    return this.http.put(environment.url + `user/${userId}`, data);
  }

}
