import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Subcategory } from '../subcategory.model';
import { SubcategoryServices } from '../subcategory.services';
import { CategoryServices } from '../../categories/category.services';

@Component({
  selector: 'subcategory-create',
  templateUrl: './subcategory-create.component.html'
})
export class SubcategoryCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  subcategory : Subcategory;
  //used to store the category list for dropbox
  categoryList = [];
  category = null;

  //constructor with the services needed and the route
  constructor(public subcategoryServices: SubcategoryServices, public categoryServices: CategoryServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //gets list of items for the dropbox
      this.categoryServices.getList().subscribe(cat=>{
        this.isLoading = false;
        this.categoryList = cat.categories;
      });
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.subcategoryServices.getOne(this.id).subscribe(subcat => {
          this.isLoading = false;
          this.subcategory = {id: subcat._id, name: subcat.name, category: subcat.category}
          this.category = subcat.category;
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
      this.subcategoryServices.add(form.value.name, form.value.category);
    } else {
      //if the edit mode is active calls the edit service
      this.subcategoryServices.update(this.id, form.value.name, form.value.category);
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1.id === o2.id;
  }
}
