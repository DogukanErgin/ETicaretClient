import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.alertifyService.message("2 günlük emek tekrardan gitti sinirli",{delay:10,messageType:MessageType.Error,position:Position.BottomRight});
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
