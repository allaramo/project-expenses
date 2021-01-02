import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { User } from '../user.model';
import { UserServices } from '../user.services';
import { RoleServices } from '../../roles/role.services';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  user : User;
  //used to store the role list for dropbox
  roleList = [];
  role = null;
  statusList = ['Active','Inactive'];
  status = null;
  show = false;

  //constructor with the services needed and the route
  constructor(public userServices: UserServices, public roleServices: RoleServices, public router: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.router.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //gets list of items for the dropbox
      this.roleServices.getList().subscribe(usr=>{
        this.isLoading = false;
        this.roleList = usr.roles;
      });
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.show = true;
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.userServices.getOne(this.id).subscribe(usr => {
          this.isLoading = false;
          this.user = {id: usr._id, email: usr.email, password: usr.password, role: usr.role, status: usr.status, logged: usr.logged}
          this.role = usr.role;
          this.status = usr.status === true ? "Active" : "Inactive";
        });
      } else {
        this.mode = 'add';
        this.id = null;
        this.show = false;
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
      this.userServices.add(form.value.email, form.value.password, form.value.role, form.value.status === "Active" ? true : false);
    } else {
      //if the edit mode is active calls the edit service
      this.userServices.update(this.id, form.value.email, form.value.password, form.value.role, form.value.status === "Active" ? true : false, form.value.logged);
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1.id === o2.id;
  }

  compareObjects2(o1: any, o2: any): boolean {
    return o1 === o2;
  }


}
