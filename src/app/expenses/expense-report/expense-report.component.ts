import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//imports model and services
import { Expense } from '../expense.model';
import { ExpenseServices } from '../expense.services';
import { CategoryServices } from '../../categories/category.services';
import { SubcategoryServices } from 'src/app/subcategories/subcategory.services';
import { ProjectServices } from '../../projects/project.services';
import { ProjectPhaseServices } from 'src/app/project-phases/project-phase.services';
import { UserServices } from 'src/app/users/user.services';
//imports material table data source module
import { MatTableDataSource } from '@angular/material/table';
//imports page event for pagination on table
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'expense-report',
  templateUrl: './expense-report.Component.html'
})
export class ExpenseReportComponent implements OnInit, OnDestroy {
  //to store the array of objects
  expenses: Expense[] = [];
  //a flag used to show or hide the progress spinner
  isLoading = false;
  //a flag used to show or hide the table
  searchComplete = false;
  //for pagination
  length = 0;
  pageSize = 100;
  page = 1;
  //for subscription
  private sub : Subscription;
  //array of headers to be shown
  displayedColumns: string[] = ['date','project','phase','category','subcategory','user','total','id'];
  //holds the data to be shown on the table
  dataSource = new MatTableDataSource(this.expenses);

  //used for datatimepickers
  initialDate = null;
  finalDate = null;

  //used to store the lists for dropboxs
  categoryList = [];
  category = null;
  subcategoryList = [];
  subcategoryListCopy = [];
  subcategory = null;
  projectList = [];
  project = null;
  phaseList = [];
  phaseListCopy = [];
  phase = null;
  userList = [];
  user = null;
  projectPhase = null;

  //constructor using services and dialog for delete event
  constructor(
    public expenseServices: ExpenseServices,
    public categoryServices: CategoryServices,
    public subcategoryServices: SubcategoryServices,
    public projectServices: ProjectServices,
    public projectPhaseServices: ProjectPhaseServices,
    public userServices: UserServices,
    public route: ActivatedRoute
  ){}

  //on init gets all data to be shown on table
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //gets list of items for the dropbox
      this.categoryServices.getList().subscribe(cat=>{
        this.isLoading = false;
        this.categoryList = cat.categories;
      });
      //gets list of items for the dropbox
      this.subcategoryServices.getList().subscribe(scat=>{
        this.isLoading = false;
        this.subcategoryList = scat.subcategories;
        this.subcategoryListCopy = scat.subcategories;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.projectServices.getList().subscribe(pro=>{
        this.isLoading = false;
        this.projectList = pro.projects;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.projectPhaseServices.getList().subscribe(pha=>{
        this.isLoading = false;
        this.phaseList = pha.projectPhases;
        this.phaseListCopy = pha.projectPhases;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.userServices.getList().subscribe(usr=>{
        this.isLoading = false;
        this.userList = usr.users;
      });
      this.initialDate = new Date();
      this.finalDate = new Date();

      this.isLoading = true;
      //calls the getall service to retrieve all data sending pagination parameters
      this.expenseServices.getAll(this.pageSize,this.page);
      //calls the update service and subscribes
      this.sub = this.expenseServices.getUpdate().subscribe((results: { data: Expense[], count: number })=>{
        this.isLoading = false;
        this.expenses = results.data;
        this.length = results.count;
        //fills the datasource for the table
        this.dataSource = new MatTableDataSource(this.expenses);
        //creates a new predicate used to filter the table
        this.dataSource.filterPredicate = (data, filter) => {
          //a variable with all information used to search on it
          const dataStr = data.project.name + data.phase.description + data.category.name + data.subcategory.name + data.user.email + data.total + data.date;
          //lowercases filters and data to find a match
          return dataStr.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
        }
      });
    })
  }

  //once is destroyed it unsubscribes
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  //if a filter is aplied the datasource looks for the keywords entered
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  onNewSearch(){
    this.searchComplete = false;
  }

  searchData(form: NgForm){
    this.searchComplete = true;
  }

  //when a paginate event ocurrs calls the get all service with the new pagination parameters
  onPaginate(pageData : PageEvent){
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.expenseServices.getAll(this.pageSize,this.page);
  }

  onChangeCat(value: Object){
    if(value){
      let list = this.subcategoryListCopy;
      this.subcategoryList = [];
      for (let i of list) {
        if(i["category"]["_id"]==value["_id"]){
          this.subcategoryList.push(i);
        }
      }
    }
  }

  onChangePro(value: Object){
    if(value){
      let list = this.phaseListCopy;
      this.phaseList = [];
      for (let i of list) {
        if(i["project"]["_id"]==value["_id"]){
          this.phaseList.push(i);
        }
      }
    }
  }
}
