import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

constructor() { }

addUser(user: any) {
  let users = []
  let data = localStorage.getItem('Users')
  if(data){
    users = JSON.parse(data)
    users = [...users,user]
  } else {
    users = [user]
  }
  localStorage.setItem('Users',JSON.stringify(users))
}

}


