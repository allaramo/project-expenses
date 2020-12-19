import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subcategory } from '../subcategory.model';
import { SubcategoryServices } from '../subcategory.services';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.Component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit, OnDestroy {
  subcategories: Subcategory[] = [];
  isLoading = false;
  length = 0;
  pageSize = 5;
  page = 1;
  private sub : Subscription;
  displayedColumns: string[] = ['name', 'category','id'];
  dataSource = new MatTableDataSource(this.subcategories);

  constructor(public subcategoryServices : SubcategoryServices, public dialog: MatDialog){}

  ngOnInit(){
    this.isLoading = true;
    this.subcategoryServices.getAll(this.pageSize,this.page);
    this.sub = this.subcategoryServices.getUpdate().subscribe((results: { data: Subcategory[], count: number })=>{
      this.isLoading = false;
      this.subcategories = results.data;
      this.length = results.count;
      this.dataSource = new MatTableDataSource(this.subcategories);
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.name + data.category.name;
        return dataStr.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
      }
    });
  }

  onDelete(id: string, name: string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: "Are you sure to delete "+ name +"?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.subcategoryServices.delete(id).subscribe(()=>{
          this.subcategoryServices.getAll(this.pageSize,this.page);
        });
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  onPaginate(pageData : PageEvent){
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.subcategoryServices.getAll(this.pageSize,this.page);
  }
}
