import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Role } from '../role.model';
import { RoleServices } from '../role.services';

@Component({
  selector: 'role-create',
  templateUrl: './role-create.component.html'
})
export class RoleCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  role : Role;

  //constructor with the services needed and the route
  constructor(public roleServices: RoleServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.roleServices.getOne(this.id).subscribe(rol => {
          this.isLoading = false;
          this.role = {id: rol._id, name: rol.name}
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
      this.roleServices.add(form.value.name);
    } else {
      //if the edit mode is active calls the edit service
      this.roleServices.update(this.id, form.value.name);
    }
    //resets form
    form.resetForm();
  }
}
