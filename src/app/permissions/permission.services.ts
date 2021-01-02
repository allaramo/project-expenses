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
import { Route } from '../routes/route.model';
import { Permission } from './permission.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class PermissionServices {
  //creating roleRoutes array based on model
  private permissions : Permission[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private permissionsUpdated = new Subject<{data: Permission[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/permission/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, permissions: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.permissions.map(permission =>{
          return {
            id: permission._id,
            role: permission.role,
            route: permission.route,
            status: permission.status
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(permissionsData=>{
      this.permissions = permissionsData.results;
      //updates the data
      this.permissionsUpdated.next({data: [...this.permissions], count: permissionsData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.permissionsUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, role: Role, route: Route, status: boolean}>(this.url + id)
  }

  //adds a new item
  add(role: Role, route: Route, status: boolean){
    //uses the model to create a new object
    const permission : Permission = {id: null, role: role, route: route, status: status};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, permission)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/permission']);
    });
  }

  //updates a new item
  update(id: string, role: Role, route: Route, status: boolean){
    //uses the model to create a new object using the id and the fields changed
    const permission : Permission = {id: id, role: role, route: route, status: status};
    //sends a put request using the id and the object
    this.http.put(this.url + id, permission)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/permission']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
