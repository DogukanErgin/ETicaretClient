
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
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


  const observable:Observable<any | Token>=this.httpClientService.post<any |Token>({
    controller:"users",
    action:"login"
  },{userNameOrEmail,password})

const token:Token =  await firstValueFrom(observable) as Token;

if(token){

  localStorage.setItem("accessToken",token.accessToken);
this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı", 
{
  messageType:ToastrMessageType.Success,
  position:ToastrPosition.BottomLeft,

});
}

  callBackFunction();



}

}

