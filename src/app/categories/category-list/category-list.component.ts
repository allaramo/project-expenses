import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../category.model';
import { CategoryServices } from '../category.services';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.Component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  categories: Category[] = [];
  isLoading = false;
  private sub : Subscription;

  constructor(public categoryServices : CategoryServices){}

  ngOnInit(){
    this.isLoading = true;
    this.categoryServices.getAll();
    this.sub = this.categoryServices.getUpdate().subscribe((categories: Category[])=>{
      this.isLoading = false;
      this.categories = categories;
    });
  }

  onDelete(id: string){
    this.categoryServices.delete(id);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
