import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Project } from '../project.model';
import { ProjectServices } from '../project.services';

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  project : Project;
  statusList = ['wip','completed'];
  status = null;

  //constructor with the services needed and the route
  constructor(public projectServices: ProjectServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.projectServices.getOne(this.id).subscribe(pro => {
          this.isLoading = false;
          this.project = {id: pro._id, name: pro.name, budget: pro.budget, description: pro.description, status: pro.status}
          this.status = pro.status;
        });
      } else {
        this.mode = 'add';
        this.id = null;
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
      this.projectServices.add(form.value.name, form.value.budget, form.value.description, form.value.status);
    } else {
      //if the edit mode is active calls the edit service
      this.projectServices.update(this.id, form.value.name, form.value.budget, form.value.description, form.value.status);
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }
}
