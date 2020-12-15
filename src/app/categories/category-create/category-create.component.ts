import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '../category.model';
import { CategoryServices } from '../category.services';

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit{
  isLoading = false;
  private mode = 'add';
  private id: string;
  category : Category;

constructor(public categoryServices: CategoryServices, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
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

  saveData(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'add'){
      this.categoryServices.add(form.value.name, form.value.description);
    } else {
      this.categoryServices.update(this.id, form.value.name, form.value.description);
    }
    form.resetForm();
  }
}
