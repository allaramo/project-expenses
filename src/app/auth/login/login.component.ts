import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthServices } from "../auth.services";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthServices) {}

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
