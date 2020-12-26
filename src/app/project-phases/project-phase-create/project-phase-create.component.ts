import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//importing model and services needed
import { ProjectPhase } from '../project-phase.model';
import { ProjectPhaseServices } from '../project-phase.services';
import { ProjectServices } from '../../projects/project.services';
import { PhaseServices } from '../../phases/phase.services';

@Component({
  selector: 'project-phase-create',
  templateUrl: './project-phase-create.component.html'
})
export class ProjectPhaseCreateComponent implements OnInit{
  //flag to be used to show or hide progress spinner
  isLoading = false;
  //flag that indicates if the app is in mode add or edit
  private mode = 'add';
  private id: string;
  projectPhase : ProjectPhase;
  //used to store the project and phase list for dropbox
  projectList = [];
  project = null;
  phaseList = [];
  phase = null;
  statusList = ['wip','completed'];
  status = null;

  //constructor with the services needed and the route
  constructor(public projectPhaseServices: ProjectPhaseServices, public projectServices: ProjectServices, public phaseServices: PhaseServices, public route: ActivatedRoute) {}

  //on init
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //gets list of items for the dropbox
      this.projectServices.getList().subscribe(pro=>{
        this.isLoading = false;
        this.projectList = pro.projects;
      });
      this.isLoading = true;
      //gets list of items for the dropbox
      this.phaseServices.getList().subscribe(pha=>{
        this.isLoading = false;
        this.phaseList = pha.phases;
      });
      //if a parameter of id is found the app is editting
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        //gets the information of the item that will be edited to fill the fields
        this.projectPhaseServices.getOne(this.id).subscribe(propha => {
          this.isLoading = false;
          this.projectPhase = {id: propha._id, project: propha.project, phase: propha.phase, percentage: propha.percentage, status: propha.status, order: propha.order }
          this.project = propha.project;
          this.phase = propha.phase;
          this.status = propha.status;
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
      this.projectPhaseServices.add(form.value.project, form.value.phase, form.value.percentage, form.value.status, form.value.order);
    } else {
      //if the edit mode is active calls the edit service
      this.projectPhaseServices.update(this.id, form.value.project, form.value.phase, form.value.percentage, form.value.status, form.value.order);
    }
    //resets form
    form.resetForm();
  }

  //compares two objects. Used to select the correct value on the dropbox in edit mode
  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?.id === o2?.id && o1?.description === o2?.description;
  }

  compareObjects2(o1: any, o2: any): boolean {
    return o1 === o2;
  }

}
