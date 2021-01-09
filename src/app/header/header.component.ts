import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthServices } from "../auth/auth.services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs: Subscription;
  email = "";
  //to enable or disable menus based on authentication
  userAuthenticated = false;
  constructor(private authService: AuthServices) {}

  ngOnInit(){
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuth => {
      this.userAuthenticated = isAuth;
      this.email = this.authService.getEmail();
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
