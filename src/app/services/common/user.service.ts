
import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { tokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService , private toastrService: CustomToastrService) { }

async create(user:User) : Promise<Create_User>  {
const observable: Observable<Create_User| User> =  this.httpClientService.post<Create_User | User>({
    controller:"users"
  },user);

return await firstValueFrom(observable) as Create_User;

}
async login(userNameOrEmail:string, password:string,callBackFunction ?: ()=>void) : Promise<any >{

  const observable:Observable<any | tokenResponse>=this.httpClientService.post<any |tokenResponse>({
    controller:"users",
    action:"login"
  },{userNameOrEmail,password})

const tokenResponse:tokenResponse =  await firstValueFrom(observable) as tokenResponse;

if(tokenResponse.message==null){

  localStorage.setItem("accessToken",tokenResponse.token.accessToken);


this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı", 
{
  messageType:ToastrMessageType.Success,
  position:ToastrPosition.BottomLeft,

});
}
else{
  this.toastrService.message(`${tokenResponse.message}`,"Giriş Başarısız", 
{
  messageType:ToastrMessageType.Warning,
  position:ToastrPosition.BottomRight,

});
}
  callBackFunction();
}
async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
  const observable: Observable<SocialUser | tokenResponse> = this.httpClientService.post<SocialUser | tokenResponse>({
    action: "google-login",
    controller: "auth"
  }, user);

  const tokenResponse: tokenResponse = await firstValueFrom(observable) as tokenResponse;

  if (tokenResponse) {
    localStorage.setItem("accessToken", tokenResponse.token.accessToken);
 

    this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  callBackFunction();
}


}

