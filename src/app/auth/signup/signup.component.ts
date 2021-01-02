import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthServices } from "../auth.services";

@Component({
  templateUrl: './signup.component.html'
})
export class SignUpComponent {
  isLoading = false;

  constructor(public authService: AuthServices) {}

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
