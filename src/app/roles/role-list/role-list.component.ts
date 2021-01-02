import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//imports model and services
import { Role } from '../role.model';
import { RoleServices } from '../role.services';
//imports material table data source module
import { MatTableDataSource } from '@angular/material/table';
//imports dialog component and material module for delete confirmation
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
//imports page event for pagination on table
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'role-list',
  templateUrl: './role-list.Component.html'
})
export class RoleListComponent implements OnInit, OnDestroy{
  //to store the array of objects
  roles: Role[] = [];
  //a flag used to show or hide the progress spinner
  isLoading = false;
  //for pagination
  length = 0;
  pageSize = 5;
  page = 1;
  //for subscription
  private sub : Subscription;
  //array of headers to be shown
  displayedColumns: string[] = ['name','id'];
  //holds the data to be shown on the table
  dataSource = new MatTableDataSource(this.roles);

  //constructor using services and dialog for delete event
  constructor(public roleServices : RoleServices, public dialog: MatDialog){}

  //on init gets all data to be shown on table
  ngOnInit(){
    this.isLoading = true;
    //calls the getall service to retrieve all data sending pagination parameters
    this.roleServices.getAll(this.pageSize,this.page);
    //calls the update service and subscribes
    this.sub = this.roleServices.getUpdate().subscribe((results: { data: Role[], count: number })=>{
      this.isLoading = false;
      this.roles = results.data;
      this.length = results.count;
      //fills the datasource for the table
      this.dataSource = new MatTableDataSource(this.roles);
      //creates a new predicate used to filter the table
      this.dataSource.filterPredicate = (data, filter) => {
        //a variable with all information used to search on it
        const dataStr = data.name;
        //lowercases filters and data to find a match
        return dataStr.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) != -1;
      }
    });
  }

  //on delete event shows the confirmation dialog
  onDelete(id: string, name: string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: "Are you sure to delete "+ name +"?"
    });
    //once the dialog is closed...
    dialogRef.afterClosed().subscribe(result => {
      //...if the yes was pressed the item is deleted calling its correspondent services
      if(result) {
        this.roleServices.delete(id).subscribe(()=>{
          //calls the service to get all data again to get an update
          this.roleServices.getAll(this.pageSize,this.page);
        });
      }
    });
  }

  //once is destroyed it unsubscribes
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  //if a filter is aplied the datasource looks for the keywords entered
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  //when a paginate event ocurrs calls the get all service with the new pagination parameters
  onPaginate(pageData : PageEvent){
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.roleServices.getAll(this.pageSize,this.page);
  }
}
