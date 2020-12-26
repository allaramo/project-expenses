import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Category } from '../category.model';
import { CategoryServices } from '../category.services';

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  category : Category;

  //constructor with the services needed and the route
  constructor(public categoryServices: CategoryServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.categoryServices.getOne(this.id).subscribe(cat => {
          this.isLoading = false;
          this.category = {id: cat._id, name: cat.name, description: cat.description}
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
      this.categoryServices.add(form.value.name, form.value.description);
    } else {
      //if the edit mode is active calls the edit service
      this.categoryServices.update(this.id, form.value.name, form.value.description);
    }
    //resets form
    form.resetForm();
  }
}
