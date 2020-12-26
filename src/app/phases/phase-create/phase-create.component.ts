import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Phase } from '../phase.model';
import { PhaseServices } from '../phase.services';

@Component({
  selector: 'phase-create',
  templateUrl: './phase-create.component.html'
})
export class PhaseCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  phase : Phase;

  //constructor with the services needed and the route
  constructor(public phaseServices: PhaseServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.phaseServices.getOne(this.id).subscribe(pha => {
          this.isLoading = false;
          this.phase = {id: pha._id, description: pha.description}
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
      this.phaseServices.add(form.value.description);
    } else {
      //if the edit mode is active calls the edit service
      this.phaseServices.update(this.id, form.value.description);
    }
    //resets form
    form.resetForm();
  }
}
