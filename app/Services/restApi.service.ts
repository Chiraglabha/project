import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn : 'root'})
export class RestApiService {

     url = 'http://localhost:3000/data/'; 

constructor(private _http : HttpClient) { }

     addEmployee(data: any) {
        return this._http.post(this.url + 'addEmp', JSON.stringify({data : data}), {
            headers : {'Content-Type' : 'application/json' },
        });
    }

    getData() {
        return this._http.get(this.url + 'showEmp');
    }

    deleteData(id : any) {
        return this._http.delete(this.url + 'delete/' + id,);
    }

    updateData(id :any) {
        return this._http.patch(this.url + 'dataId/', + id);
    }
}
