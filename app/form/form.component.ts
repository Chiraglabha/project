import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserService } from '../Services/add-user.service';
import { RestApiService } from '../Services/restApi.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  mobNumberPattern = "^([\+0]91)?\-?[6-9]{1}[0-9]{9}$";
  emailPattern = "^(([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]+)[.]([a-zA-Z]{2,4}))$";
  user: any = {};
  id: any;
  userData = {
    'name': "",
    'email': "",
    'number': Number,
    'department': "",
  }

  buttonType: string = 'Save';


  constructor(private _router: Router, private _addUserService: AddUserService,
    private _route: ActivatedRoute , private restApi : RestApiService ) { }


  ngOnInit() {
    const id1 = this._route.snapshot.paramMap.get('Id');
    if (id1) {
      this.id = id1;
      const dt1 = localStorage.getItem('Users')
      if (dt1) {
        const data = JSON.parse(dt1);
        const dt = data.find((a: any) => a.Id == id1);
        console.log(dt);
        this.userData = dt;
        this.buttonType = 'Update'
      }
    }
  }

  onSubmit(form: NgForm) {
    if (this._router.url === '/form') {
      alert("Form Submited");
      this.user = Object.assign(this.user, form.value);
      this._addUserService.addUser(this.user)
      this.restApi.addEmployee(this.user).subscribe();
      form.reset();
      this._router.navigateByUrl('home');
    } else {
      const oldData = localStorage.getItem('Users');
      // const oldData = this.restApi.getData().subscribe();
      if (oldData) {
        console.log(form.value);
        const oldData1 = JSON.parse(oldData);
        const id2 = oldData1.findIndex((a: any) => a.Id == this.id);
        this.id = id2;
        oldData1[id2] = form.value;
        localStorage.setItem('Users', JSON.stringify(oldData1));
        this.restApi.updateData(this.id).subscribe();
        this.restApi.getData().subscribe();
        alert("Form Updated");
        form.reset();
        this._router.navigateByUrl('home');
      }
    }
  }
}
