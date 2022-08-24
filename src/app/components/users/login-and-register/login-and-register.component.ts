import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  data: string

  email: string = ''

  activeEmailModal:boolean = false

  ngOnInit(): void {
    this.id = this.user.id;
    this.userName = this.user.userName;
    this.password = this.user.password;
  }

  register(){
    var user = {
      userName: this.userName,
      password: this.password
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
        this.router.navigate(['/app'])
        console.log(res.token)
        alert(res.text())
      }
      error => {
        //Handle the error here
        //If not handled, then throw it
        alert(res.msg)
        throw error; 
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
      var closeModalBtn = document.getElementById('add-edit-modal-close')
      if(closeModalBtn){
        closeModalBtn.click()
      }
      
    })  
  }
}
