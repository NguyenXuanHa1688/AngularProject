import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
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
      return this.http.get<APIResponse<Game>>(`${env.GAME_URL}/games`,{
        headers: new HttpHeaders()
        .set(env.XRapidAPIHostHeaderName, env.XRapidAPIHostHeaderValueForGame)
        .set(env.XRapidAPIKeyHeaderName, env.XRapidAPIKeyHeaderValue),
        params: params
        .set('key',env.key)})
  }

  getGameDetails(id: string):Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.GAME_URL}/games/${id}`, {        
      headers: new HttpHeaders()
      .set(env.XRapidAPIHostHeaderName, env.XRapidAPIHostHeaderValueForGame)
      .set(env.XRapidAPIKeyHeaderName, env.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('key',env.key)})
    const gameTrailerRequest = this.http.get(
      `${env.GAME_URL}/games/${id}/movies`, {
        headers: new HttpHeaders()
        .set(env.XRapidAPIHostHeaderName, env.XRapidAPIHostHeaderValueForGame)
        .set(env.XRapidAPIKeyHeaderName, env.XRapidAPIKeyHeaderValue),
        params: new HttpParams()
        .set('key',env.key)
      }
    )
    const gameScreenshotsRequest = this.http.get(
      `${env.GAME_URL}/games/${id}/screenshots`
    , {
      headers: new HttpHeaders()
      .set(env.XRapidAPIHostHeaderName, env.XRapidAPIHostHeaderValueForGame)
      .set(env.XRapidAPIKeyHeaderName, env.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('key',env.key)
    })

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
      })
    )
  }
}
