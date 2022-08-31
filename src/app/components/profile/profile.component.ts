import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private service:ApiService ) { }

  public user:  Array<User>

  public u = 'test'

  @ViewChild('idChange') idChange: ElementRef;
  @ViewChild('usernameChange') usernameChange: ElementRef;
  @ViewChild('passwordChange') passwordChange: ElementRef;
  @ViewChild('roleChange') roleChange: ElementRef;

  ngOnInit(): void {
    this.getUserProfile(sessionStorage.getItem('username').toString())
    console.log(this.user)
  }

  getUserProfile(name: string){
    this.service.findUser(name).subscribe({
      next: (response) => {
        this.user = response
        console.log(this.user)
      }
    })
  }

  updateProfile(id: number){
    var user = {
      id: this.idChange.nativeElement.value,
      userName: this.usernameChange.nativeElement.value,
      password: this.passwordChange.nativeElement.value,
      role: this.roleChange.nativeElement.value,
    }
    this.service.updateProfile(id, user).subscribe(res => {
      alert('success')
    })
  }
}
