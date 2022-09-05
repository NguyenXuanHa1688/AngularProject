import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() cityname = new EventEmitter<string>()

  constructor(private router: Router) { }

  username = sessionStorage.getItem('username')
  userRole = sessionStorage.getItem('role')

  ngOnInit(): void {
    
  }

  onSearch(value: string) {
    this.cityname.emit(value) 
    console.log(value)
  }

  public logout = () => {
    localStorage.removeItem("token")
    sessionStorage.clear()
    this.router.navigate(['/'])
  }
  
  onSearchInspection(value: string){
    this.cityname.emit(value)
  }
}
