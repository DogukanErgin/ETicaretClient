import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent  {


@Input() options : Partial<FileUploadOptions>;
  
  constructor(
    private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService,
    private dialogService:DialogService
    ) { }

  public files: NgxFileDropEntry[];

  public selectedFiles(files:NgxFileDropEntry[]){
    this.files=files;
    const fileData: FormData=new FormData();
    for (const file of files){
(file.fileEntry as FileSystemFileEntry).file((_file :File ) => {
  fileData.append(_file.name,_file,file.relativePath);
});
}

this.dialogService.openDialog({
componentType:FileUploadDialogComponent,
data:FileUploadDialogState.Yes,
afterClosed:()=>{
  

  this.httpClientService.post({
    controller:this.options.controller,
    action:this.options.action,
    queryString:this.options.queryString,
    headers: new HttpHeaders({"responseType":"blob"})
  },fileData).subscribe(data=>{
  
    const message:string="Dosyalar başarıyla yüklendi";
  
    if(this.options.isAdminPage){
  this.alertifyService.message(message,{
    dismissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopCenter
  });
  
  
  }else{
  this.customToastrService.message(message,"başarılı",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopFullWidth
  })
  
  }
  },(errorResponse:HttpErrorResponse)=>{
  
    const message:string="Dosyalar yüklenemedi";
  
  if(this.options.isAdminPage){
  
    this.alertifyService.message(message,{
      dismissOthers:false,
      messageType:MessageType.Error,
      position:Position.TopCenter
    });
    
  
  }else{
    this.customToastrService.message(message,"başarısız",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopFullWidth
  });
  };
  
  
    });


}

}); 


  }

//  openDialog(afterClosed:any): void {

//   const dialogRef=this.dialog.open(FileUploadDialogComponent,{
//     width:"250px",
//     data:FileUploadDialogState.Yes
//   });

//   dialogRef.afterClosed().subscribe(result=>{
//     if(result ==FileUploadDialogState.Yes)
//     afterClosed();
//   });
//  }


}
export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?:boolean=false;
}
