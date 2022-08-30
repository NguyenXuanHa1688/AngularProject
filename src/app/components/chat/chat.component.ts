import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public signalRService: SignalrService) { }

  ngOnInit(): void {
    this.signalRService.connect();
    console.log(this.signalRService.messages)
  }

  title = 'chat-ui';
  text: string = "";

  sendMessage(): void {
    this.signalRService.sendMessageToApi(this.text).subscribe({
      next: _ => this.text = '',
      error: (err) => console.error(err)
    });

    // this.signalRService.sendMessageToHub(this.text).subscribe({
    //   next: _ => this.text = '',
    //   error: (err) => console.error(err)
    // });
  }
}
