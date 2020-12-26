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
import { Phase } from '../phases/phase.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class PhaseServices {
  //creating subphases array based on model
  private phases : Phase[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private phasesUpdated = new Subject<{data: Phase[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/phase/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, phases: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.phases.map(phase =>{
          return {
            id: phase._id,
            description: phase.description
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(phasesData=>{
      this.phases = phasesData.results;
      //updates the data
      this.phasesUpdated.next({data: [...this.phases], count: phasesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.phasesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, description: string}>(this.url + id);
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, phases: any}>(this.url);
  }

  //adds a new item
  add(description: string){
    //uses the model to create a new object
    const phase : Phase = {id: null, description: description};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, phase)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/phase']);
    });
  }

  //updates a new item
  update(id: string, description: string){
    //uses the model to create a new object using the id and the fields changed
    const phase : Phase = {id: id, description: description};
    //sends a put request using the id and the object
    this.http.put(this.url + id, phase)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/phase']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
