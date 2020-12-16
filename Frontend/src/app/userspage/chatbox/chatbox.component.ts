import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { from } from 'rxjs';
import {WebsocketService} from "../../services/websocket.service"
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  chatform:FormGroup;
  username:string;
  messages:any=[];
  public browserRefresh: boolean;
  // this.messages=[]
  @Input() childMessage: string;
  constructor(public websocket:WebsocketService) { 
    
  }

  ngOnInit(): void {
    this.getusername()
    this.websocket.getMessage().subscribe(messages=>{
      this.messages.push(messages)
    })
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    this.chatform=new FormGroup({
      reciver_name: new FormControl(this.childMessage),
      sender_name:new FormControl(this.username),
      message:new FormControl(''),
    })
    if(this.browserRefresh==true){
      const last_msg=JSON.parse(sessionStorage.getItem('last_10_msg'))
      for (var i = 0; i < last_msg.length; i++) {
          this.messages.push(last_msg[i])
      } 
    }
  }
 

  ngOnDestroy(): void {
    this.websocket.closeWebSocket();
  }

  onSubmit(){
   
    sessionStorage.setItem('showlastmsg','false')
    this.websocket.sendMessage(this.chatform.value)
  }

  getusername(){
    this.username=sessionStorage.getItem('username');
  }
}
