import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private service:ApiService) {}

  logData?: logs
  public loglist: Array<logs>
  public userlist: Array<User>

  userlist$!:Observable<any[]>

  userName: string = ''
  password: string = ''
  role: string= ''

  @ViewChild('idChange') idChange: ElementRef;
  @ViewChild('usernameChange') usernameChange: ElementRef;
  @ViewChild('passwordChange') passwordChange: ElementRef;
  @ViewChild('roleChange') roleChange: ElementRef;

  ngOnInit(): void {
    this.userName = this.userName
    this.userlist$ = this.service.getUsers()
    this.getUsers()
    this.getLogsList()
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

  updateUser(id: number){
    var user = {
      userName: this.usernameChange.nativeElement.value,
      password: this.passwordChange.nativeElement.value,
      role: this.roleChange.nativeElement.value,
    }
    this.service.updateUser(id, user).subscribe(res => {
        console.log(res)
      }
    )
  }

  deleteUser(id: number){
    this.service.deleteUser(id).subscribe(res => {
      this.getLogsList()
      alert('Success delete user')
      this.getUsers()
    })
  }

  findUser(name: string){
    this.service.findUser(name).subscribe({
      next: (response) => {
        this.userlist = response
        console.log(this.userlist)
      }
    })
  }
}
