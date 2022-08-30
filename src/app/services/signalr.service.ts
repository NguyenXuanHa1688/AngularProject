import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { chatMessage } from '../model/chatMessage.model';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection
  public messages: chatMessage[] = [];
  private connectionUrl = 'https://localhost:7142/chatHub';
  private apiUrl = 'https://localhost:7142/api/Chat';

  constructor(private http: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public sendMessageToApi(message: string) {
    return this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl, 
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }
      )
      .withHubProtocol(new MessagePackHubProtocol())
      
      //  .configureLogging(LogLevel.Trace)
      .build();
  }

  private buildChatMessage(message: string): chatMessage {
    return {
      connectionId: this.hubConnection.connectionId,
      text: message,
      dateTime: new Date()
    };
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("messageReceivedFromApi", (data: chatMessage) => {
      console.log("message received from API Controller")
      this.messages.push(data);
      console.log(data)
    })
    this.hubConnection.on("messageReceivedFromHub", (data: chatMessage) => {
      console.log("message received from Hub")
      this.messages.push(data);
    })
    this.hubConnection.on("newUserConnected", _ => {
      console.log("new user connected")
    })
  }
}
