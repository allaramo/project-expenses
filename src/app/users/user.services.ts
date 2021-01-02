//importing injectable and http client
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//importing rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
//importing router
import { Router } from '@angular/router';
//importing env vars
import { environment } from '../../environments/environment';
//importing models needed
import { Role } from '../roles/role.model';
import { User } from './user.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class UserServices {
  //creating users array based on model
  private users : User[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private usersUpdated = new Subject<{data: User[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/user/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, users: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.users.map(user =>{
          return {
            id: user._id,
            email: user.email,
            password: user.password,
            role: user.role,
            status: user.status,
            logged: user.logged
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(usersData=>{
      this.users = usersData.results;
      //updates the data
      this.usersUpdated.next({data: [...this.users], count: usersData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.usersUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, email: string, password: string, role: Role, status: boolean, logged: boolean}>(this.url + id)
  }

  //adds a new item
  add(email: string, password: string, role: Role, status: boolean){
    //uses the model to create a new object
    const user : User = {id: null, email: email, password: password, role: role, status: status, logged: false};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, user)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/user']);
    });
  }

  //updates a new item
  update(id: string, email: string, password: string, role: Role, status: boolean, logged: boolean){
    //uses the model to create a new object using the id and the fields changed
    const user : User = {id: id, email: email, password: password, role: role, status: status, logged: logged};
    //sends a put request using the id and the object
    this.http.put(this.url + id, user)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/user']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
