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
import { Project } from '../projects/project.model';

//adding injectable
@Injectable({providedIn: 'root'})
export class ProjectServices {
  //creating subprojects array based on model
  private projects : Project[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private projectsUpdated = new Subject<{data: Project[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/project/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, projects: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.projects.map(project =>{
          return {
            id: project._id,
            name: project.name,
            budget: project.budget,
            description: project.description,
            status: project.status
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(projectsData=>{
      this.projects = projectsData.results;
      //updates the data
      this.projectsUpdated.next({data: [...this.projects], count: projectsData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.projectsUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, name: string, budget: number, description: string, status: string}>(this.url + id);
  }

  //gets a list of items to fill for dropboxes
  getList(){
    //sends a get request
    return this.http.get<{msg: string, projects: any}>(environment.apiURL+'/lists/project');
  }

  //adds a new item
  add(name: string, budget: number, description: string, status: string){
    //uses the model to create a new object
    const project : Project = {id: null, name: name, budget: budget, description: description, status: status};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, project)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/project']);
    });
  }

  //updates a new item
  update(id: string, name: string, budget: number, description: string, status: string){
    //uses the model to create a new object using the id and the fields changed
    const project : Project = {id: id, name: name, budget: budget, description: description, status: status};
    //sends a put request using the id and the object
    this.http.put(this.url + id, project)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/project']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
