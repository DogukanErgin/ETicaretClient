import { Injectable } from '@angular/core';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position',options.position);
    const msg=alertify[options.messageType](message);     // Type 'undefined' cannot be used as an index type. hatasının çözümü tsconfig.json dan strict i false
    if(options.dismissOthers)
    msg.dismissOthers();
    }
 

}
export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.TopLeft;
  delay:number=3;
  dismissOthers:boolean=false;
}


export enum MessageType{
Error ="error",
Message ="message",
Notify ="notify",
Success ="success",
Warning="warning"
}

export enum Position{
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left"
}