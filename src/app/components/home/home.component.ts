import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { APIResponse, Game } from 'src/app/model/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private httpService: HttpService,
    private acctiveRouter: ActivatedRoute) { }

  public sort:string
  public games: Array<Game>
  private routeSub: Subscription
  private gameSub: Subscription

  page: number = 1
  count: number = 0
  tableSize: number = 8

  ngOnInit(): void {
    this.routeSub = this.acctiveRouter.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.gameSearch(params['game-search'])
      } else {
        this.gameSearch('metacritic')
      }     
    })
  }

  gameSearch(sort: string, search?:string):void{
    this.gameSub = this.httpService
      .getgamelist(sort, search)
      .subscribe((gamelist: APIResponse<Game>) => {
        this.games = gamelist.results
        console.log(this.games)
      })
  }

  openGameDetail(id: string):void{
    this.router.navigate(['detail', id])
    console.log('run?')
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

  onTableDataChange(event: any){
    this.page = event
    // this.getLogsList()
  }

  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value
    this.page = 1
    // this.getLogsList()
  }
}
