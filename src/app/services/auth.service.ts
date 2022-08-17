import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  saveToken(token: any){
    localStorage.setItem("token",token);
  }
  getToken(){
    return localStorage.getItem("token");
  }
  isAuthenticated(){
    const tokenInfo = this.getDecodedAccessToken(this.getToken()); // decode token
    const expireDate = tokenInfo.exp; // get token expiration dateTime
    console.log(tokenInfo); // show decoded token object in console
    if(expireDate){return true;}  
    return false;
  }
}
