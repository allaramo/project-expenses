import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { Permission } from '../permission.model';
import { PermissionServices } from '../permission.services';
import { RoleServices } from '../../roles/role.services';
import { RouteServices } from '../../routes/route.services';

@Component({
  selector: 'permission-create',
  templateUrl: './permission-create.component.html'
})
export class PermissionCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  permission : Permission;
  //used to store the role and route list for dropbox
  roleList = [];
  role = null;
  routeList = [];
  route = null;
  statusList = [{text: 'Allowed', value: true},{text: 'Denied', value: false}];
  status = null;

  //constructor with the services needed and the route
  constructor(public permissionServices: PermissionServices, public roleServices: RoleServices, public routeServices: RouteServices, public router: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.router.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //gets list of items for the dropbox
      this.roleServices.getList().subscribe(rol=>{
        this.isLoading = false;
        this.roleList = rol.roles;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.routeServices.getList().subscribe(rou=>{
        this.isLoading = false;
        this.routeList = rou.routes;
      });
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.permissionServices.getOne(this.id).subscribe(perm => {
          this.isLoading = false;
          this.permission = {id: perm._id, role: perm.role, route: perm.route, status: perm.status}
          this.role = perm.role;
          this.route = perm.route;
          this.status = perm.status == true ? "Allowed" : "Denied";
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
      this.permissionServices.add(form.value.role, form.value.route, form.value.status);
    } else {
      //if the edit mode is active calls the edit service
      this.permissionServices.update(this.id, form.value.role, form.value.route, form.value.status);
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?.id === o2?.id && o1?.path === o2?.path;
  }

  compareObjects2(o1: any, o2: any): boolean {
    return o1.text === o2.text && o1.value === o2.value;
  }

}
