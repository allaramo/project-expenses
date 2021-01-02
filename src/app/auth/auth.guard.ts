import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServices } from "./auth.services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServices, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    if(!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
