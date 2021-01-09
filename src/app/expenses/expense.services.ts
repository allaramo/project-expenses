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
import { Subcategory } from '../subcategories/subcategory.model';
import { Project } from '../projects/project.model';
import { Phase } from '../phases/phase.model';
import { ProjectPhase } from '../project-phases/project-phase.model';
import { User } from '../users/user.model';
import { Expense } from './expense.model';
import { Schema } from 'mongoose';

//adding injectable
@Injectable({providedIn: 'root'})
export class ExpenseServices {
  //creating expenses array based on model
  private expenses : Expense[] = [];
  private expensesReport : Object[] = [];
  //creating a new subject to collect the data retrieved and the counter of items
  private expensesUpdated = new Subject<{data: Expense[], count: number}>();
  private expensesReportUpdated = new Subject<{data: Object[], count: number}>();
  //prepares the url used for the http requests
  private url = environment.apiURL+'/expense/';

  //constructor using the http client and the router
  constructor(private http: HttpClient, private router: Router) {}

  //gets all the data paginated
  getAll(pageSize: number, page: number){
    //prepares the pagination parameters
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    //does a get request using the pagination
    this.http.get<{msg: string, expenses: any, count: number}>(this.url+queryParams)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.expenses.map(expense =>{
          return {
            id: expense._id,
            date: expense.date,
            total: expense.total,
            category: expense.category,
            subcategory: expense.subcategory,
            project: expense.project,
            phase: expense.phase,
            projectPhase: expense.projectPhase,
            user: expense.user
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(expensesData=>{
      this.expenses = expensesData.results;
      //updates the data
      this.expensesUpdated.next({data: [...this.expenses], count: expensesData.count});
    });
  }

  getReport(data : any){
    this.http.post<{msg: string, expenses: any, count: number}>(this.url+"report",data)
    //maps the results to return a json with the message, the array of items and the counter
    .pipe(map(data=>{
      return {
        //maps the array of itmes
        results : data.expenses.map(expense =>{
          return {
            id: expense._id,
            date: expense.date,
            total: expense.total,
            category: expense.category,
            subcategory: expense.subcategory,
            project: expense.project,
            phase: expense.phase,
            projectPhase: expense.projectPhase,
            user: expense.user
          }
        }),
        count: data.count
      };
    }))
    //subscribes to the data
    .subscribe(expensesData=>{
      this.expensesReport = expensesData.results;
      //updates the data
      this.expensesReportUpdated.next({data: [...this.expensesReport], count: expensesData.count});
    });
  }

  //makes an observable
  getUpdate(){
    return this.expensesUpdated.asObservable();
  }

  //makes an observable
  getReportUpdate(){
    return this.expensesReportUpdated.asObservable();
  }

  //gets one item based on its id
  getOne(id: string){
    //sends a get request using the id
    return this.http.get<{
      _id: string,
      date: Schema.Types.Date,
      total: number,
      category: Category,
      subcategory: Subcategory,
      project: Project,
      phase: Phase,
      projectPhase: ProjectPhase,
      user: User
    }>(this.url + id)
  }

  //adds a new item
  add(
    date: Schema.Types.Date,
    total: number,
    category: Category,
    subcategory: Subcategory,
    project: Project,
    phase: Phase,
    projectPhase: ProjectPhase,
    user: User
  ){
    //uses the model to create a new object
    const expense : Expense = {
      id: null,
      date: date,
      total: total,
      category: category,
      subcategory: subcategory,
      project: project,
      phase: phase,
      projectPhase: projectPhase,
      user: user
    };
    //sends a post request sending the object
    this.http.post<{msg: string, id: string}>(this.url, expense)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/expense']);
    });
  }

  //updates a new item
  update(
    id: string,
    date: Schema.Types.Date,
    total: number,
    category: Category,
    subcategory: Subcategory,
    project: Project,
    phase: Phase,
    projectPhase: ProjectPhase,
    user: User
  ){
    //uses the model to create a new object using the id and the fields changed
    const expense : Expense = {
      id: id,
      date: date,
      total: total,
      category: category,
      subcategory: subcategory,
      project: project,
      phase: phase,
      projectPhase: projectPhase,
      user: user
    };
    //sends a put request using the id and the object
    this.http.put(this.url + id, expense)
    //subscribes and returns to the table's screen
    .subscribe(res=>{
      this.router.navigate(['/expense']);
    });
  }

  //deletes the item based on its id
  delete(id : string){
    //sends a delete request using the id
    return this.http.delete(this.url + id);
  }
}
