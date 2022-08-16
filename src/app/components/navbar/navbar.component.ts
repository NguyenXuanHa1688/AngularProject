import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() cityname = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
  }

  onSearch(value: string) {
    this.cityname.emit(value);
    
    console.log(value)
  }
}
