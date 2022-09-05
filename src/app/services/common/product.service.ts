import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { List_Product } from 'src/app/contracts/list_product';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }


  createProduct(product : Create_Product , successCallBack?:()=>void, errorCallBack?:(errorMessage:string)=>void) {

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

  async getProduct(page: number=0,size:number=5, successCallBack?:()=>void, errorCallBack?:(errorMessage:string)=>void) : Promise<{totalCount:number;products: List_Product[]}>{
    const promiseData: Promise<{totalCount:number;products: List_Product[]}>=this.httpClientService.get<{totalCount:number;products: List_Product[]}>({controller:"products",queryString:`page=${page}&size=${size}`}).toPromise();

    promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message));
    return await promiseData;
  }

  async delete(id : string){

    const deleteObservable:Observable<any>=this.httpClientService.delete<any>({controller:"products"},id);
    await firstValueFrom(deleteObservable);
  }
  async readImages(id: string, successCallBack?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages",
      controller: "products"
    }, id);

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
  
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  // async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
  //   const changeShowcaseImageObservable = this.httpClientService.get({
  //     controller: "products",
  //     action: "ChangeShowcaseImage",
  //     queryString: `imageId=${imageId}&productId=${productId}`
  //   });
  //   await firstValueFrom(changeShowcaseImageObservable);
  //   successCallBack();
  // }
}
