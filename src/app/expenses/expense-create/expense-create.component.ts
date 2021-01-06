import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Expense } from '../expense.model';
import { ExpenseServices } from '../expense.services';
import { CategoryServices } from '../../categories/category.services';
import { SubcategoryServices } from 'src/app/subcategories/subcategory.services';
import { ProjectServices } from '../../projects/project.services';
import { PhaseServices } from '../../phases/phase.services';
import { ProjectPhaseServices } from 'src/app/project-phases/project-phase.services';
import { UserServices } from 'src/app/users/user.services';

@Component({
  selector: 'expense-create',
  templateUrl: './expense-create.component.html'
})
export class ExpenseCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  startDate = null;
  expense : Expense;
  //used to store the lists for dropboxs
  categoryList = [];
  category = null;
  subcategoryList = [];
  subcategory = null;
  projectList = [];
  project = null;
  phaseList = [];
  phase = null;
  userList = [];
  user = null;
  projectPhase = null;

  //constructor with the services needed and the route
  constructor(
    public expenseServices: ExpenseServices,
    public categoryServices: CategoryServices,
    public subcategoryServices: SubcategoryServices,
    public projectServices: ProjectServices,
    public phaseServices: PhaseServices,
    public userServices: UserServices,
    public route: ActivatedRoute
  ) {}

  //on init
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
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.projectServices.getList().subscribe(pro=>{
        this.isLoading = false;
        this.projectList = pro.projects;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.phaseServices.getList().subscribe(pha=>{
        this.isLoading = false;
        this.phaseList = pha.phases;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.userServices.getList().subscribe(usr=>{
        this.isLoading = false;
        this.userList = usr.users;
      });
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.expenseServices.getOne(this.id).subscribe(exp => {
          this.isLoading = false;
          this.expense = {
            id: exp._id,
            date: exp.date,
            total: exp.total,
            category: exp.category,
            subcategory: exp.subcategory,
            project: exp.project,
            phase: exp.phase,
            projectPhase: exp.projectPhase,
            user: exp.user
           }
          this.category = exp.category;
          this.subcategory = exp.subcategory;
          this.project = exp.project;
          this.phase = exp.phase;
          this.user = exp.user;
          this.startDate = exp.date;
        });
      } else {
        this.mode = 'add';
        this.id = null;
        this.startDate = new Date();
      }
    })
  }

  //saves the data using the fields of the form
  saveData(form: NgForm){
    //if the form is invalid does nothing
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'add'){
      //if the add mode is active calls the add service
      this.expenseServices.add(
        form.value.date,
        form.value.total,
        form.value.category,
        form.value.subcategory,
        form.value.project,
        form.value.phase,
        this.projectPhase,
        form.value.user
      );
    } else {
      //if the edit mode is active calls the edit service
      this.expenseServices.update(
        this.id,
        form.value.date,
        form.value.total,
        form.value.category,
        form.value.subcategory,
        form.value.project,
        form.value.phase,
        this.projectPhase,
        form.value.user
      );
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?.id === o2?.id
  }

  compareObjects2(o1: any, o2: any): boolean {
    return o1?.description === o2?.description && o1?.id === o2?.id
  }

  compareObjects3(o1: any, o2: any): boolean {
    return o1?.email === o2?.email && o1?.id === o2?.id
  }

}
