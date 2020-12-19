import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subcategory } from '../subcategory.model';
import { SubcategoryServices } from '../subcategory.services';
import { CategoryServices } from '../../categories/category.services';

@Component({
  selector: 'category-create',
  templateUrl: './subcategory-create.component.html',
  styleUrls: ['./subcategory-create.component.css']
})
export class SubcategoryCreateComponent implements OnInit{
  isLoading = false;
  private mode = 'add';
  private id: string;
  subcategory : Subcategory;
  categoryList = [];
  category = null;

constructor(public subcategoryServices: SubcategoryServices, public categoryServices: CategoryServices, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      this.categoryServices.getList().subscribe(cat=>{
        this.isLoading = false;
        this.categoryList = cat.categories;
      });
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.subcategoryServices.getOne(this.id).subscribe(subcat => {
          this.isLoading = false;
          this.subcategory = {id: subcat._id, name: subcat.name, category: subcat.category}
          this.category = subcat.category;
        });
      } else {
        this.mode = 'add';
        this.id = null;
        this.categoryServices.getList().subscribe(cat=>{
          this.isLoading = false;
          this.categoryList = cat.categories;
        });
      }
    })
  }

  saveData(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'add'){
      this.subcategoryServices.add(form.value.name, form.value.category);
    } else {
      this.subcategoryServices.update(this.id, form.value.name, form.value.category);
    }
    form.resetForm();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
}
