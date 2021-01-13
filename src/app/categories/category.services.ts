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
import { Category } from '../categories/category.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class CategoryServices {
  //creating subcategories array based on model
  private categories : Category[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private categoriesUpdated = new Subject<{data: Category[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/category/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, categories: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.categories.map(category =>{
          return {
            id: category._id,
            name: category.name,
            description: category.description
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(categoriesData=>{
      this.categories = categoriesData.results;
      //updates the data
      this.categoriesUpdated.next({data: [...this.categories], count: categoriesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.categoriesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, name: string, description: string}>(this.url + id);
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, categories: any}>(environment.apiURL+'/lists/category');
  }

  //adds a new item
  add(name: string, description: string){
    //uses the model to create a new object
    const category : Category = {id: null, name: name, description: description};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, category)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/category']);
    });
  }

  //updates a new item
  update(id: string, name: string, description: string){
    //uses the model to create a new object using the id and the fields changed
    const category : Category = {id: id, name: name, description: description};
    //sends a put request using the id and the object
    this.http.put(this.url + id, category)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/category']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
