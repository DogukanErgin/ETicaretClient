import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent, SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CompconfigbaseComponent implements OnInit {

  constructor( private userService:UserService, spinner: NgxSpinnerService) {
    super(spinner)

  }
  ngOnInit(): void {
  }

async login(userNameOrEmail:string , password : string){
this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
await this.userService.login(userNameOrEmail,password,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating));
}

}
