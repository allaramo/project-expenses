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
import { Route } from '../routes/route.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class RouteServices {
  //creating subroutes array based on model
  private routes : Route[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private routesUpdated = new Subject<{data: Route[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/route/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, routes: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.routes.map(route =>{
          return {
            id: route._id,
            path: route.path
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(routesData=>{
      this.routes = routesData.results;
      //updates the data
      this.routesUpdated.next({data: [...this.routes], count: routesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.routesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, path: string}>(this.url + id);
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, routes: any}>(this.url);
  }

  //adds a new item
  add(path: string){
    //uses the model to create a new object
    const route : Route = {id: null, path: path};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, route)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/route']);
    });
  }

  //updates a new item
  update(id: string, path: string){
    //uses the model to create a new object using the id and the fields changed
    const route : Route = {id: id, path: path};
    //sends a put request using the id and the object
    this.http.put(this.url + id, route)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/route']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
