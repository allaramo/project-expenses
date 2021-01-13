import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MessageComponent } from "./message/message.component";
//importing router
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private router: Router) {}
  //intercepting requests
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      //if an error is catched
      catchError((error: HttpErrorResponse) => {
        //default message in case error.msg comes empty
        let errorMessage = "An unknown error occurred";
        if (error) {
          errorMessage = error.error.msg;
        }
        //opens dialog sending the message
        this.dialog.open(MessageComponent, {
          width: '350px',
          data: errorMessage
        });
        if(errorMessage=='Access Forbidden'){
          this.router.navigate(["/"]);
        } else {
          //gets the current path
          this.router.navigate(["/"+ req.url.split("/")[3]]);
        }
        // throws error
        return throwError(error);
      })
    );
  }
}
