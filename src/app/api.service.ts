import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly AppAPIUrl = 'https://localhost:7142/api'

  constructor(private http:HttpClient) { }

  //INSPECTION API
  getInspectionList():Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl +'/inspections', {headers: httpHeaders})
  }

  searchInspectionById(id: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl +`/inspections/${id}`, {headers: httpHeaders})
  }

  addInspection(data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(this.AppAPIUrl +'/inspections', data, {headers: httpHeaders})
  }

  updateInspection(id: number|string, data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.put<any>(this.AppAPIUrl + `/inspections/${id}`, data, {headers: httpHeaders})
  }

  deleteInspection(id: number|string){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.delete<any>(this.AppAPIUrl + `/inspections/${id}`, {headers: httpHeaders})
  }

  //INSPECTION TYPE API
  getInspectionTypeList():Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl +'/inspectionTypes', {headers: httpHeaders})
  }

  addInspectionType(data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(this.AppAPIUrl +'/inspectionTypes', data, {headers: httpHeaders})
  }

  updateInspectionType(id: number|string, data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(this.AppAPIUrl + `/inspectionTypes/${id}`, data, {headers: httpHeaders})
  }

  deleteInspectionType(id: number|string){
    return this.http.delete<any>(this.AppAPIUrl + `/inspectionTypes/${id}`)
  }

  //STATUS API
  getStatusList():Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl +'/status', {headers: httpHeaders})
  }

  addStatus(data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(this.AppAPIUrl +'/status', data, {headers: httpHeaders})
  }

  updateStatus(id: number|string, data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.post<any>(this.AppAPIUrl + `/status/${id}`, data, {headers: httpHeaders})
  }

  deleteStatus(id: number|string){
    return this.http.delete<any>(this.AppAPIUrl + `/status/${id}`)
  }

  //REGISTER AND LOGIN
  register(data: any){
    return this.http.post<any>(this.AppAPIUrl +'/Auth/register', data)
  }

  login(data: any){
    return this.http.post<any>(this.AppAPIUrl +'/Auth/login', data)
  }

  //SEND PASSWORD FOR USER
  sendPassword(data: any){
    return this.http.post<any>(this.AppAPIUrl + '/Email',data)
  }

  //get current login user
  getCurrentUser(data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl + '/Auth/getuser', {headers: httpHeaders})
  }

  //get activities list
  getLog():Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token')
    })
    return this.http.get<any>(this.AppAPIUrl + '/LogActivities', {headers: httpHeaders})
  }

  //filter activities base on user name
  searchLogUser(data: any){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl + `/Auth/filteruser/?request=${data}` , {headers: httpHeaders})
  }

  //get user accounts list
  getUsers():Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl + '/UserDto')
  }

  //update user
  updateUser(id: number, data: any):Observable<any[]>{
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.put<any>(this.AppAPIUrl + `/UserDto/${id}`, data)
  }

  //delete user
  deleteUser(id: number){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.delete(this.AppAPIUrl + `/UserDto/${id}`, {headers: httpHeaders})
  }

  //find user
  findUser(name: string){
    const httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem("token")
    })
    return this.http.get<any>(this.AppAPIUrl + `/UserDto/filteruser/?request=${name}`)
  }
}
