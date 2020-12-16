// import { Observable} from 'rxjs/Observable'
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';  
import 'rxjs/add/observable/of';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {   
  webSocket: WebSocket;
  recivemessages: any = [];
  chatMessageDto:any
  private subject = new Subject<any>();
  public openWebSocket(send_by:string,send_to:string){
    const string=this.getstring(send_by,send_to)
    sessionStorage.setItem('roomname',string)
    const url= 'ws://localhost:8000/ws/chat/'+string+'/'
    this.webSocket = new WebSocket(url);
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
      console.log("connected")
      // this.recivemessages=[]
    };

    this.webSocket.onmessage = (event) => {
     
      this.chatMessageDto = JSON.parse(event.data);
      sessionStorage.setItem('last_10_msg',JSON.stringify(this.chatMessageDto['last_10_messages'].reverse()))
      delete this.chatMessageDto['last_10_messages']
      this.subject.next(this.chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(messages){
    this.webSocket.send(JSON.stringify(messages))
  }

  public closeWebSocket() {
    this.webSocket.close();
  }

  public getstring(string1,string2){
    let str=[string1,string2]
    str=str.sort()
    str=str.concat()
    return str.join().replace(",","")
  }

  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
