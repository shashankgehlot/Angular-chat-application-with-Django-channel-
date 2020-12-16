import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url='http://127.0.0.1:8000/'
  constructor(private http:HttpClient) { }
 
   login(username:string,password:string){
    const httpOptions={
      headers:new HttpHeaders({
      'Content-Type':'application/json'})
    }
      return this.http.post<any>(this.api_url+`api/login/`,
      { username,password },httpOptions).pipe(
        map(user=>{
         
          if(user && user.token){
            sessionStorage.setItem('username',user.username)
            sessionStorage.setItem("token",user.token)
          }
          return user;
        })
      );
    }
  
   logout(){  
    let headers = new HttpHeaders()
    if (sessionStorage.getItem("token") != null) {
      headers=headers.append('Authorization',`Token ${sessionStorage.getItem("token")}`)
      const httpOptions={
      headers:headers
      }
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      return this.http.get(this.api_url+`api/logout`,
      httpOptions).pipe(map((response) => {return response}))
      }
    }
    
    public getToken(): string {
      return sessionStorage.getItem('token') 
    }

  getdata(){
    return this.http.get(this.api_url);
  }

 
  SendForRegister(username:string,password:string,email:string,first_name:string,last_name:string){
    const httpOptions={
      headers:new HttpHeaders({
      'Content-Type':'application/json'})
    }

    return this.http.post<any>(`http://127.0.0.1:8000/api/register/`,{
    username ,
    password,
    email,
    first_name,
    last_name
    },httpOptions).pipe(map((response) => {return response}))
  }
}

