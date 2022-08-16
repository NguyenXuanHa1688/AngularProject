import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.scss']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>
  inspectionTypesList$!:Observable<any[]>
  inspectionTypesList:any=[]

  //MAP DISPLAY DATA WITH FOREIGN KEY
  inspectionTypesMap:Map<number, string> = new Map() 
  constructor(private service:ApiService ) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList()
    console.log(this.inspectionList$)
    this.inspectionTypesList$ = this.service.getInspectionTypeList()
    this.refreshInspectionTypesMap()
  }

  //Varialble
  modalTitle:string =  ''
  activeAddEditInspectionComponent:boolean = false
  inspection:any

  modalAdd() {
    this.inspection = {
      id: 0,
      status: null,
      comment: null,
      inspectionTypeId: null
    }
    this.modalTitle = 'Add Inspection'
    this.activeAddEditInspectionComponent = true
  }

  modalClose() {
    this.activeAddEditInspectionComponent = false
    this.inspectionList$ = this.service.getInspectionList()
  }

  modalEdit(item:any) {
    this.inspection = item,
    this.modalTitle = 'Edit Inspection'
    this.activeAddEditInspectionComponent = true
  }

  delete(item:any) {
    if(confirm(`Are you sure want to delete this ${item.id}`)){
      this.service.deleteInspection(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close')
        if(closeModalBtn){
          closeModalBtn.click()
        }
        var showDelSuccess = document.getElementById('delete-success')
        if(showDelSuccess){
          showDelSuccess.style.display = "block"
        }
        setTimeout(function() {
          if(showDelSuccess) {
            showDelSuccess.style.display = "none"
          }
        }, 4000)
      })
    }
  }

  refreshInspectionTypesMap() {
    this.service.getInspectionTypeList().subscribe(data => {
      this.inspectionTypesList = data 

      for(let i = 0; i <= data.length; i++){
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }
    })
    console.log(this.inspectionTypesList)
  }

}
