import { Component, OnInit } from '@angular/core';
import {FetchuserService} from '../services/fetchuser.service'
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router'; 
import { ThrowStmt } from '@angular/compiler';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-userspage',
  templateUrl: './userspage.component.html',
  styleUrls: ['./userspage.component.css']
})
export class UserspageComponent implements OnInit {
  public Online_user:any;
  public chat_start_with:any
  public showchatbox:boolean=false;
  public logged_in_user:string;
  constructor(private fetch:FetchuserService,private auth:AuthService,public router: Router,public websocket:WebsocketService) { }

  ngOnInit(): void {
      this.getloggeduser()
      this.buttonclick()
  }

  public buttonclick(){
    this.fetch.getdata().subscribe(data=>{this.Online_user=data})
    console.log('onlineuser',this.Online_user)
    if(sessionStorage.getItem('showchatbox')==='true'){
      this.showchatbox=true;
      this.chat_start_with=sessionStorage.getItem('communicating_with');
      this.websocket.openWebSocket(this.logged_in_user,this.chat_start_with);
    }
  }
  
  public startconv(user){
      this.chat_start_with=user;
      this.showchatbox=true;
      sessionStorage.setItem('showchatbox','true');
      sessionStorage.setItem('communicating_with',this.chat_start_with);
      sessionStorage.removeItem('last_10_msg')
      this.websocket.openWebSocket(this.logged_in_user,this.chat_start_with);
  }

  logout(){
    this.router.navigateByUrl('/login')
    return this.auth.logout().subscribe(
      data=>{
        console.log(data)
        sessionStorage.removeItem('showchatbox')
        sessionStorage.removeItem('communicating_with')
        sessionStorage.removeItem('last_10_msg')
        sessionStorage.removeItem('roomname')
      }
      
    )
  }

  getloggeduser(){
    this.logged_in_user=sessionStorage.getItem('username')
  }

}
