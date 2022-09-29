import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent, SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CompconfigbaseComponent implements OnInit {

  constructor( private userService:UserService, spinner: NgxSpinnerService,private authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute,
    private socialAuthService:SocialAuthService ) {
    super(spinner)

 this.googleLogin();

  }
  ngOnInit(): void {
  }

async login(userNameOrEmail:string , password : string){
  debugger;
this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);

await this.userService.login(userNameOrEmail,password,()=>
{
 
  this.authService.identityCheck();
  this.activatedRoute.queryParams.subscribe(params=>{
    const returnUrl:string=params["returnUrl"];
    if(returnUrl)
    this.router.navigate([returnUrl]);
    
  else
  this.router.navigate([""]);
  });


  this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
});

}

async googleLogin(){
  
  this.socialAuthService.authState.subscribe(async(user:SocialUser)=>{
        console.log(user);
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    await this.userService.googleLogin(user,()=>
    {
      this.authService.identityCheck();
    this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    });
  });
}

}
