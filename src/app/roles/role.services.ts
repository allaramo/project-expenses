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

//adding injectable
@Injectable({providedIn: 'root'})
export class RoleServices {
  //creating subroles array based on model
  private roles : Role[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private rolesUpdated = new Subject<{data: Role[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/role/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, roles: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.roles.map(role =>{
          return {
            id: role._id,
            name: role.name
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(rolesData=>{
      this.roles = rolesData.results;
      //updates the data
      this.rolesUpdated.next({data: [...this.roles], count: rolesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.rolesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, name: string}>(this.url + id);
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, roles: any}>(this.url);
  }

  //adds a new item
  add(name: string){
    //uses the model to create a new object
    const role : Role = {id: null, name: name};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, role)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/role']);
    });
  }

  //updates a new item
  update(id: string, name: string){
    //uses the model to create a new object using the id and the fields changed
    const role : Role = {id: id, name: name};
    //sends a put request using the id and the object
    this.http.put(this.url + id, role)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/role']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
