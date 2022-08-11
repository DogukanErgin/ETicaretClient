import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/product.service';
declare var  $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialogService: DialogService,
    public alertifyService: AlertifyService
    ) { 

      const img =_renderer.createElement("img");
      img.setAttribute("src","/assets/delete.png");
      img.setAttribute("style","cursor:pointer;");
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img);
    }
    @Input() id : string;
    @Input() controller: string;
    @Output() callback : EventEmitter<any>= new EventEmitter();

    @HostListener("click")
    async onclick(){
      this.dialogService.openDialog({
        componentType: DeleteDialogComponent,
        data:DeleteState.Yes,
        afterClosed:async ()=>{
          const td:HTMLTableCellElement=this.element.nativeElement;
         this.spinner.show(SpinnerType.BallAtom);
          await this.httpClientService.delete({controller:this.controller},this.id).subscribe(data =>{
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toggle"
            },1700,()=>{
              
            }).
             fadeOut(2000,()=>{
               this.callback.emit();
             this.spinner.hide(SpinnerType.BallAtom);
             this.alertifyService.message("Ürün başarıyla silindi",{
              messageType:MessageType.Success,
              position:Position.BottomLeft,
              delay:2000,
              dismissOthers:false
  
             })
             }); 
          },(errorResponse:HttpErrorResponse)=>{
            this.alertifyService.message("Beklenmeyen bir hata alındı detayı",{
              messageType:MessageType.Error,
              position:Position.BottomCenter,
              delay:2000,
              dismissOthers:false
  
             }) 
             this.spinner.hide(SpinnerType.BallAtom);
            } );
         
        }
      });
  
    }

//     openDialog(callBack:any): void {
//       const dialogRef = this.dialog.open(DeleteDialogComponent, {
//         width: '250px',
//         data: DeleteState.Yes,
//       });
  
//       dialogRef.afterClosed().subscribe(result => {
//         if(result==DeleteState.Yes){
// callBack();
//         }
      
//       });
//     }
  }
  


