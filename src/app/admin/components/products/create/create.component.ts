import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent, SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends CompconfigbaseComponent implements OnInit {

  constructor(private productService:ProductService , spinner: NgxSpinnerService, private alertify: AlertifyService) { 
    super(spinner);
  }

  ngOnInit(): void {
  }
create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
  this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
const create_productobject:Create_Product= new Create_Product();
create_productobject.name=name.value;
create_productobject.stock=parseInt(stock.value);
create_productobject.price=parseFloat(price.value);
 

this.productService.createProduct (create_productobject, ()=>{
  this.alertify.message("Başarılı şekilde ürün eklendi",{messageType:MessageType.Success,position:Position.BottomRight,delay:7,dismissOthers:true}); 
  this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)},
  errorMessage=>{
    
    this.alertify.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.BottomLeft
    });
    this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
  });

}
}
