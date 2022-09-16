import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper : JwtHelperService,private router:Router,private toastrService:CustomToastrService,private spinner: NgxSpinnerService) { }

identityCheck(){
  const token: string =localStorage.getItem("accessToken");

  let expired:boolean;
  try{
    expired =this.jwtHelper.isTokenExpired(token);
  }
  catch{
    expired=true;
  }

  _isAuthenticated=token!=null&&!expired;
}

get isAuthenticated():boolean{
  return _isAuthenticated;
}

}

export let _isAuthenticated:boolean;




