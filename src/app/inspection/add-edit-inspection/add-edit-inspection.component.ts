import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.scss']
})
export class AddEditInspectionComponent implements OnInit {

inspectionList$!:Observable<any[]>
statusList$!:Observable<any[]>
inspectionTypesList$!:Observable<any[]>

  constructor(private service:ApiService) { }

  @Input() inspection:any
  id: number = 0
  status: string = ''
  comment: string = ''
  inspectionTypeId!: number

  ngOnInit(): void {
    this.id = this.inspection.id
    this.status = this.inspection.status
    this.comment = this.inspection.comment
    this.inspectionTypeId = this.inspection.inspectionTypeId
    this.statusList$ = this.service.getStatusList()
    this.inspectionList$ = this.service.getInspectionList()
    this.inspectionTypesList$ = this.service.getInspectionTypeList()
  }

  addInspection() {
    var inspection = {
      status : this.status,
      comment : this.comment,
      inspectionTypeId: this.inspectionTypeId 
    }
    this.service.addInspection(inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close')
      if(closeModalBtn){
        closeModalBtn.click()
      }
      var showAddSuccess = document.getElementById('add-success')
      if(showAddSuccess){
        showAddSuccess.style.display = 'block'
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = 'none'
        }
      }, 4000)
    })  
  }

  updateInspection() {
    var inspection = {
      id: this.id,
      status : this.status,
      comment : this.comment,
      inspectionTypeId: this.inspectionTypeId 
    }
    var id:number = this.id
    this.service.updateInspection(id,inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close')
      if(closeModalBtn){
        closeModalBtn.click()
      }
      var showUpdateSuccess = document.getElementById('update-success')
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = 'block'
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none'
        }
      }, 4000)
    })
  }
}
