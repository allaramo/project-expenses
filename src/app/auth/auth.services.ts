import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//importing router
import { Router } from '@angular/router';
//importing env vars
import { environment } from '../../environments/environment';
//importing models needed
import { User } from '../users/user.model';
//imports dialog component and material module for delete confirmation
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from "../message/message.component";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthServices {
  private url = environment.apiURL+'/user/';
  private token : string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  createUser(email: string, password: string){
    //uses the model to create a new object
    const user : User = {id: null, email: email, password: password, role: null, status: false, logged: false};

    //sends a post request sending the object
    this.http.post<{msg: string, id: string, error: string}>(this.url + '/signup/', user)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      const messageRef = this.dialog.open(MessageComponent, {
        width: '350px',
        data: res.msg
      });
      //once the dialog is closed...
      messageRef.afterClosed().subscribe(result => {
        if(res.error==''){
          this.router.navigate(['/login']);
        }
      });
    });
  }

  login(email: string, password: string){
    //uses the model to create a new object
    const user : User = {id: null, email: email, password: password, role: null, status: false, logged: false};

    //sends a post request sending the object
    this.http.post<{msg: string, error: string, token: string}>(this.url + '/login/', user)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      const messageRef = this.dialog.open(MessageComponent, {
        width: '350px',
        data: res.msg
      });
      //authentication token
      const token = res.token;
      this.token = token;
      if(token){
        //to inform user is authenticated
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }

      //once the dialog is closed...
      messageRef.afterClosed().subscribe(result => {
        if(res.error==''){
          this.router.navigate(['/']);
        }
      });
    });
  }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  logout(){
    //deleting token, setting to false listener and redirecting to homepage
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
