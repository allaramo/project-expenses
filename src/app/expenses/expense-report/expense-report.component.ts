import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
//imports services
import { ExpenseServices } from '../expense.services';
import * as printJS from 'print-js';

@Component({
  selector: 'expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit, OnDestroy {
  //to store the array of objects
  expenses: Object[] = [];
  //a flag used to show or hide the progress spinner
  isLoading = false;
  //for subscription
  private sub : Subscription;

  //constructor using services and dialog for delete event
  constructor(
    public expenseServices: ExpenseServices,
    public route: ActivatedRoute
  ){}

  //on init gets all data to be shown on table
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap : ParamMap)=> {
      this.isLoading = true;
      //calls the service to retrieve data
      this.expenseServices.getReport();
      //calls the update service and subscribes
      this.sub = this.expenseServices.getReportUpdate().subscribe((results: { data: Object[]})=>{
        this.isLoading = false;
        this.expenses = results.data;
      });
    })
  }

  //once is destroyed it unsubscribes
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  //prints HTML into PDF whit customized styles
  downloadPDF(){
    printJS({
      printable: 'content',
      type: 'html',
      scanStyles: true,
      style: ''+
       'table{border: 1px solid black;table-layout: fixed;background-color: ghostwhite;'+
      'font-family: Roboto, "Helvetica Neue", sans-serif;margin-bottom:50px}'+
      'th {border: 1px solid black; font-size: 12px;font-weight: bold;}'+
      'td {font-size: 14px;text-align: right;color: rgba(0,0,0,.87);}'+
      '.project th {background-color: #141464; color: ghostwhite;}'+
      '.phase th {background-color: #2457a3;color: ghostwhite;}'+
      '.expense th {background-color: hsl(221, 24%, 55%);color: ghostwhite;}'+
      ''
    });



  }
}
