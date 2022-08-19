import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() cityname = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  onSearch(value: string) {
    this.cityname.emit(value);
    
    console.log(value)
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.router.navigate(['/'])
  }
  
  onSearchInspection(value: string){
    this.cityname.emit(value);
  }
}
