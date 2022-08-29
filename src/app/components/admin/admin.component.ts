import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { logs } from 'src/app/model/log.model';
import { User } from 'src/app/model/user.model'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service:ApiService ) {}

  logData?: logs
  public loglist: Array<logs>
  public userlist: Array<User>

  ngOnInit(): void {
    this.getLogsList()
    this.getUsers()
  }
  
  getLogsList(){
    this.service.getLog().subscribe({
      next: (response) => {
      this.loglist = response
      console.log(this.loglist)
    }})
  }

  searchLogUser(user: string){
    this.service.searchLogUser(user)
    .subscribe({
      next: (response) => {
        this.loglist = response
        console.log(this.loglist)
      }
    })
  }

  getUsers(){
    this.service.getUsers().subscribe({
      next: (response) => {
        this.userlist = response
        console.log(this.userlist)
      }
    })
  }
}
