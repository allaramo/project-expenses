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
import { Phase } from '../phases/phase.model';
import { ProjectPhase } from './project-phase.model';
//imports dialog component and material module for delete confirmation
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from "../message/message.component";

//adding injectable
@Injectable({providedIn: 'root'})
export class ProjectPhaseServices {
  //creating projectPhases array based on model
  private projectPhases : ProjectPhase[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private projectPhasesUpdated = new Subject<{data: ProjectPhase[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/projectphase/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, projectPhases: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.projectPhases.map(projectPhase =>{
          return {
            id: projectPhase._id,
            project: projectPhase.project,
            phase: projectPhase.phase,
            percentage: projectPhase.percentage,
            status: projectPhase.status,
            order: projectPhase.order
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(projectPhasesData=>{
      this.projectPhases = projectPhasesData.results;
      //updates the data
      this.projectPhasesUpdated.next({data: [...this.projectPhases], count: projectPhasesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.projectPhasesUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{_id: string, project: Project, phase: Phase, percentage: number, status: string, order: number}>(this.url + id)
  }

   //gets a list of items to fill for dropboxes
   getList(){
    //sends a get request
    return this.http.get<{msg: string, projectPhases: any}>(this.url);
  }

  //adds a new item
  add(project: Project, phase: Phase, percentage: number, status: string, order: number){
    //uses the model to create a new object
    const projectPhase : ProjectPhase = {id: null, project: project, phase: phase, percentage: percentage, status: status, order: order};
    //sends a post request sending the object
    this.http.post<{msg: string, id: string, error: string}>(this.url, projectPhase)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      if(res.error){
        this.dialog.open(MessageComponent, {
          width: '350px',
          data: res.error
        });
      }
      this.router.navigate(['/projectphase']);
    });
  }

  //updates a new item
  update(id: string, project: Project, phase: Phase, percentage: number, status: string, order: number){
    //uses the model to create a new object using the id and the fields changed
    const projectPhase : ProjectPhase = {id: id, project: project, phase: phase, percentage: percentage, status: status, order: order};
    //sends a put request using the id and the object
    this.http.put<{error: string}>(this.url + id, projectPhase)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      if(res.error){
        this.dialog.open(MessageComponent, {
          width: '350px',
          data: res.error
        });
      }
      this.router.navigate(['/projectphase']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
