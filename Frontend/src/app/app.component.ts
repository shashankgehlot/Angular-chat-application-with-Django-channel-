import { Component } from '@angular/core';
import { from } from 'rxjs';
import {FetchuserService} from './services/fetchuser.service'
import { Router } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationStart} from '@angular/router';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  msg:any
  subscription:Subscription
  constructor(private auth:FetchuserService,public router: Router,public http: HttpClient){
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }
  
  buttonclick(){
    return this.auth.getdata().subscribe(data=>{
      data
    })
  }
 
  public ping() {
    this.http.get('http://localhost:8000/api/hi')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
      }
}

