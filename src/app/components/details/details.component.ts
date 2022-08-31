import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Game } from 'src/app/model/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httppService: HttpService,
    private router: Router,
    private service: ApiService
  ) { }

  gameRating = 0
  gameId: string
  game: Game
  routeSub: Subscription
  gameSub: Subscription

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id']
      this.getGameDetails(this.gameId)
    })
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httppService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp

        setTimeout(() => {
          this.gameRating = this.game.metacritic
        }, 1000)
      })
  }

  getColor(value: number): string {
    if(value > 75) {
      return '#Eee432'
    } else if(value > 50){
      return '#fffa50'
    } else if(value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
  }

  singleSearch(search: string):void{
    this.router.navigate(['detail', search])
    console.log(search)
  }

  addToMyGameList(){
    var mygame = {
      apiId : this.gameId,
      name : this.game.name,
      userAdd: sessionStorage.getItem('username')
    }
    this.service.addMyGame(mygame).subscribe(res => {
      alert('success add game')
    })
  }

}
