import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{

  constructor(
    dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService) { 
    super(dialogRef);
  }


  @Output() options: Partial<FileUploadOptions>={
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Lütfen ürünü tanımlamak için gereken resimleri yükleyiniz... ",
    isAdminPage:true,
    queryString:`id=${this.data}`
   
  };

  images: ListProductImage[];

  
  async ngOnInit(): Promise<void> {

    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom));

  }

async deleteImage(imageId:string, event:any){

  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed:async()=>{
      this.spinner.show(SpinnerType.BallAtom)
      await this.productService.deleteImage(this.data as string, imageId,()=>{
        this.spinner.hide(SpinnerType.BallAtom);
        var card= $(event.srcElement).parent().parent();
        card.fadeOut(500);
      });
    }
  })
}

// showCase(imageId: string) {
//   this.spinner.show(SpinnerType.BallAtom);

//   this.productService.changeShowcaseImage(imageId, this.data as string, () => {
//     this.spinner.hide(SpinnerType.BallAtom);
//   });
// }

}
export enum SelectProductImageState{
  Close
}