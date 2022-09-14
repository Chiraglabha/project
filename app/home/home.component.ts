import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { RestApiService } from '../Services/restApi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageTitle: string = 'Add Employee Data'

  data: Data[] = [];

  constructor(private _router: Router, private restApi : RestApiService) {
  }

  ngOnInit() {
    const empList = localStorage.getItem('Users');
    if(empList){
      this.data = JSON.parse(empList);
    }
  }

  editButton(Id: any) {
    this._router.navigate(['/form/', Id]);
  }

  deleteButton(Id : any) {
    console.log(Id);

    const oldData = localStorage.getItem('Users');
    if(oldData) {
      const oldData1 = JSON.parse(oldData);      
      oldData1.splice(oldData1.findIndex((a: any) => a.Id == Id),1);
      localStorage.setItem('Users',JSON.stringify(oldData1));
    }
    this.ngOnInit()   
  }
}






