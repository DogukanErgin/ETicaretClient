import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }


  createProduct(product : Create_Product , successCallBack?:any, errorCallBack?:any) {

    this.httpClientService.post({controller:"products"},product).subscribe(result=>{
      successCallBack();
      },(errorResponse:HttpErrorResponse)=>{      
        const _error : Array<{key:string,value:Array<string>}>=errorResponse.error
        let message="";
        _error.forEach((v,index)=>{
v.value.forEach((_v,_index)=>{
message+=`${_v}<br>`
});
     });          
        errorCallBack(message);
      });
  }
}