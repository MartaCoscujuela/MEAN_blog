import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: "root"
})

export class AuthService{

  constructor(private http : HttpClient){}

  createUser(email: string, password: string){
    const authData: AuthData = { email, password: password}
    this.http.post("http://localhost:3000/api/user/singup", authData).subscribe((response)=>{
      console.log(response);
    });
  }


  loginUser(email, password){
    const authData: AuthData = { email, password: password}
    this.http.post("http://localhost:3000/api/user/login", authData).subscribe((response)=>{
      console.log(response);
    });
  }
}
