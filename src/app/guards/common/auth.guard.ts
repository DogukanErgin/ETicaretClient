import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private jwtHelper:JwtHelperService,private router:Router,private toastrService:CustomToastrService, private spinner: NgxSpinnerService) {
  

}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    this.spinner.show(SpinnerType.BallScaleMultiple);
    // const token:string=localStorage.getItem("accessToken");

    // const experitionDate=this.jwtHelper.getTokenExpirationDate(token);
    // const expired:boolean=this.jwtHelper.isTokenExpired(token);
    


    if(!_isAuthenticated){
    this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
this.toastrService.message("Oturum açmanız gerekli!","Yetkisiz Erişim",{
  messageType:ToastrMessageType.Warning,
  position:ToastrPosition.TopRight
});
    }

      this.spinner.hide(SpinnerType.BallScaleMultiple);
      return true;
  }
  
}
