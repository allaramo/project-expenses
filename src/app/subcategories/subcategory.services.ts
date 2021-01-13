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
import { Subcategory } from './subcategory.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class SubcategoryServices {
  //creating subcategories array based on model
  private subcategories : Subcategory[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private subcategoriesUpdated = new Subject<{data: Subcategory[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/subcategory/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, subcategories: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.subcategories.map(subcategory =>{
          return {
            id: subcategory._id,
            name: subcategory.name,
            category: subcategory.category
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(subcategoriesData=>{
      this.subcategories = subcategoriesData.results;
      //updates the data
      this.subcategoriesUpdated.next({data: [...this.subcategories], count: subcategoriesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.subcategoriesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, name: string, category: Category}>(this.url + id)
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, subcategories: any}>(environment.apiURL+'/lists/subcategory');
  }

  //adds a new item
  add(name: string, category: Category){
    //uses the model to create a new object
    const subcategory : Subcategory = {id: null, name: name, category: category};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, subcategory)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/subcategory']);
    });
  }

  //updates a new item
  update(id: string, name: string, category: Category){
    //uses the model to create a new object using the id and the fields changed
    const subcategory : Subcategory = {id: id, name: name, category: category};
    //sends a put request using the id and the object
    this.http.put(this.url + id, subcategory)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/subcategory']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
