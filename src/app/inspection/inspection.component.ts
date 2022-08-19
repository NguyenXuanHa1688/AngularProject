import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {

  constructor(private service:ApiService) { }

  ngOnInit(): void {
  }

  searchInspection(searchcity: string){
    this.service.searchInspectionById(parseInt(searchcity)).subscribe(res =>{
      alert(res.comment)
    })
  }
}
