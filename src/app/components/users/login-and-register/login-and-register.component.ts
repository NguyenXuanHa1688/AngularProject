import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent implements OnInit {

  constructor(
    private service:ApiService,
    private router: Router,
    private authService: AuthService) { }

  @Input() user:any
  id: number = 0
  userName: string = ''
  password: string = ''
  role: string= 'user'

  data: string

  email: string = ''

  activeEmailModal:boolean = false

  currentUser: User

  ngOnInit(): void {
    this.id = this.user.id;
    this.userName = this.user.userName;
    this.password = this.user.password;
  }

  register(){
    var user = {
      userName: this.userName,
      password: this.password,
      role: this.role
    }
    this.service.register(user).subscribe(res => {
      alert("SUCCESS CREATE ACCOUNT")
    })
  }

  login(){
    var user = {
      userName: this.userName,
      password: this.password
    }
    this.service.login(user).subscribe(res => {
      if(res){
        this.authService.saveToken(res.token);
        this.getuser()
        this.router.navigate(['/app'])
        // console.log(res.token)
        // alert(res.text())
      }
    //   error => {
    //     //Handle the error here
    //     //If not handled, then throw it
    //     alert(res.msg)
    //     throw error; 
    //  }
    })
    
  }

  getuser(){
    this.service.getCurrentUser(this.currentUser).subscribe({
      next: (res) =>{
        this.currentUser = res
        sessionStorage.setItem('username', res.currentUserName)
        sessionStorage.setItem('role', res.currentUserRole)
        // alert(JSON.stringify(res))
      }
    })
  }

  modalClose() {
    this.activeEmailModal = false
  }

  modalOpen() {
    this.activeEmailModal= true
  }

  sendPassword(){
    var EmailDetail = {
      userName : this.userName,
      email : this.email,
    }
    this.service.sendPassword(EmailDetail).subscribe(res => {
      alert("SUCCESS - PLEASE CHECK YOUR EMAIL")
    })  
  }
}
