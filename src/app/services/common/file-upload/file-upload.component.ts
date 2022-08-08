import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
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
    private customToastrService:CustomToastrService
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
this.httpClientService.post({
  controller:this.options.controller,
  action:this.options.action,
  queryString:this.options.queryString,
  headers: new HttpHeaders({"responseType":"blob"})
},fileData).subscribe(data=>{

  const message:string="Dosyalar başarıyla yüklendi";

  if(this.options.isAdminPage){
this.alertifyService.message(message,{
  dismissOthers:false,
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

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


}
export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?:boolean=false;
}
