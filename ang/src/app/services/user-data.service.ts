import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {



  constructor(private http: HttpClient) { }
  users() {
    return this.http.get<any>("http://127.0.0.1:5000/get");
  }
  SaveUsers(data: any) {
    return this.http.post("http://127.0.0.1:5000/add", data);
  }
  deleteUser(id: number) {
    return this.http.delete(`http://127.0.0.1:5000/delete/${id}`);

  }
  updateUser(id: any, data: any) {
    return this.http.put<any>(`http://127.0.0.1:5000/update/${id}`, data);
  }
}


// injc root = services should be in roor model.. 
// constructor(private http: HttpClient) === httpc class used to send & recevd data from server..  