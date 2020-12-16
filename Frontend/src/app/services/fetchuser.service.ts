import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FetchuserService {
  roomname:string
  api_url='http://127.0.0.1:8000/api/hi/'
  chat_get_msg_url='http://127.0.0.1:8000/chat/'
  constructor(private http:HttpClient) { }

  getdata(){
    let headers = new HttpHeaders()
    if (sessionStorage.getItem("token") != null) {
      headers=headers.append('Authorization',`Token ${sessionStorage.getItem("token")}`)
    const httpOptions={headers:headers}
    return this.http.get(this.api_url,httpOptions).pipe(map((response) => {return response}));
    }
  }

  
}
