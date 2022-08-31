import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { gamelist } from 'src/app/model/gamelist.modal';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private service:ApiService) { }

  public gamelist:  Array<gamelist>
  
  gamelist$!:Observable<any[]>


  ngOnInit(): void {
    // this.gamelist$ = this.service.getMyGameList(sessionStorage.getItem('username'))
    this.getMyGameList(sessionStorage.getItem('username'))
    console.log(this.gamelist)
  }

  getMyGameList(name: string){
    this.service.getMyGameList(name).subscribe({
      next: (response) => {
        this.gamelist = response
        console.log(this.gamelist)
      }
    })
  }

  deleteMyGame(id: number){
    this.service.deleteMyGame(id).subscribe(res => {
      alert('Success delete game from gamelist')
      this.getMyGameList(sessionStorage.getItem('username'))
    })
  }

}
