import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Route } from '../route.model';
import { RouteServices } from '../route.services';

@Component({
  selector: 'route-create',
  templateUrl: './route-create.component.html'
})
export class RouteCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  route : Route;

  //constructor with the services needed and the route
  constructor(public routeServices: RouteServices, public actRoute: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.actRoute.paramMap.subscribe((paramMap : ParamMap)=> {
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.routeServices.getOne(this.id).subscribe(rou => {
          this.isLoading = false;
          this.route = {id: rou._id, path: rou.path}
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
      this.routeServices.add(form.value.path);
    } else {
      //if the edit mode is active calls the edit service
      this.routeServices.update(this.id, form.value.path);
    }
    //resets form
    form.resetForm();
  }
}
