import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//importing router
import { Router } from '@angular/router';
//importing env vars
import { environment } from '../../environments/environment';
//importing models needed
import { User } from '../users/user.model';

@Injectable({providedIn: "root"})
export class AuthServices {
  private url = environment.apiURL+'/user/';

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string){
    //uses the model to create a new object
    const user : User = {id: null, email: email, password: password, role: null, status: false, logged: false};

    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, user)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/']);
    });
  }
}
