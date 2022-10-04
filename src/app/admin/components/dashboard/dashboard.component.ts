import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertifyService:AlertifyService,private signalRService:SignalRService) { 

    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.alertifyService.message("Dashboard mesajı",{delay:10,messageType:MessageType.Success,position:Position.BottomRight});
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
      this.alertifyService.message(message,{
        messageType:MessageType.Notify,
        delay:5,
        position:Position.TopLeft
      });
    });
  }


  m(){
    this.alertifyService.message("hata yok",{
      messageType:MessageType.Success,
      delay:15,
      position:Position.BottomRight,
      dismissOthers:true
      
    });
  }
}
