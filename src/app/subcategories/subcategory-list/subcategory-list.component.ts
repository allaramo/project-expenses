import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subcategory } from '../subcategory.model';
import { SubcategoryServices } from '../subcategory.services';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.Component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit, OnDestroy{
  subcategories: Subcategory[] = [];
  isLoading = false;
  private sub : Subscription;
  displayedColumns: string[] = ['name', 'category'];
  dataSource = new MatTableDataSource(this.subcategories);

  constructor(public subcategoryServices : SubcategoryServices){

  }

  ngOnInit(){
    this.isLoading = true;
    this.subcategoryServices.getAll();
    this.sub = this.subcategoryServices.getUpdate().subscribe((subcategories: Subcategory[])=>{
      this.isLoading = false;
      this.subcategories = subcategories;
      this.dataSource = new MatTableDataSource(this.subcategories);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.name + data.category.name;
        return dataStr.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
      }
    });
  }

  onDelete(id: string){
    this.subcategoryServices.delete(id);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
}
