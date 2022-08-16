import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly AppAPIUrl = 'https://localhost:7142/api'

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.AppAPIUrl + '/Users');
  }

  addUser(data: any){
    return this.http.post(this.AppAPIUrl + '/Users', data)
  }

  //INSPECTION API
  getInspectionList():Observable<any[]>{
    return this.http.get<any>(this.AppAPIUrl +'/inspections')
  }

  addInspection(data: any){
    return this.http.post<any>(this.AppAPIUrl +'/inspections', data)
  }

  updateInspection(id: number|string, data: any){
    return this.http.put<any>(this.AppAPIUrl + `/inspections/${id}`, data)
  }

  deleteInspection(id: number|string){
    return this.http.delete<any>(this.AppAPIUrl + `/inspections/${id}`)
  }

  //INSPECTION TYPE API
  getInspectionTypeList():Observable<any[]>{
    return this.http.get<any>(this.AppAPIUrl +'/inspectionTypes')
  }

  addInspectionType(data: any){
    return this.http.post<any>(this.AppAPIUrl +'/inspectionTypes', data)
  }

  updateInspectionType(id: number|string, data: any){
    return this.http.post<any>(this.AppAPIUrl + `/inspectionTypes/${id}`, data)
  }

  deleteInspectionType(id: number|string){
    return this.http.delete<any>(this.AppAPIUrl + `/inspectionTypes/${id}`)
  }

  //STATUS API
  getStatusList():Observable<any[]>{
    return this.http.get<any>(this.AppAPIUrl +'/status')
  }

  addStatus(data: any){
    return this.http.post<any>(this.AppAPIUrl +'/status', data)
  }

  updateStatus(id: number|string, data: any){
    return this.http.post<any>(this.AppAPIUrl + `/status/${id}`, data)
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
}
