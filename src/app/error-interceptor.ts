import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MessageComponent } from "./message/message.component";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}
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
        // throws error
        return throwError(error);
      })
    );
  }
}
