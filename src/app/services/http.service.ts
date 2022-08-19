import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getgamelist(
    ordering: string,
    searching?: string
    ):Observable<APIResponse<Game>> {
      let params = new HttpParams().set('ordering', ordering)
      if(searching){
        let params = new HttpParams().set('ordering', ordering).set('Searching', searching)
      }
      return this.http.get<APIResponse<Game>>(`${env.GAME_URL}/games`,{params: params})
  }
}
