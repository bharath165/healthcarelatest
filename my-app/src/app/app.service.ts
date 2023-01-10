import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AppService {

  constructor(private http: HttpClient) { }



  rootURL = '/HealthAPIv2';
  liveBaseUrl = 'http://20.228.170.193:8080'

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  getGridData(gridCount: number, searchText: string) {

    // return this.http.get(this.rootURL + `/drugInfo/${gridCount}?searchText=${searchText}`);
    if (gridCount == 1) {
      return this.http.get("http://127.0.0.1:5000/icd10/" + `${searchText}`);
    }
     else if (gridCount == 2) {
      return this.http.get("http://127.0.0.1:5000/conceptIDs/" + `${searchText}`);
    }
     else if (gridCount == 3) {
      return this.http.get("http://127.0.0.1:5000/icd10/" + `${searchText}`);
    }
     else if (gridCount == 4) {
      return this.http.get("http://127.0.0.1:5000/NDCs/" + `${searchText}`);
    }
  }
  getGridDataLive(gridName: string) {

    return this.http.get(this.rootURL + `/health/${gridName}`.toString());

  }
  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', { user });
  }

}
