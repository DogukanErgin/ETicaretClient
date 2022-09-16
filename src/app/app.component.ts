import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageType, Position } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor( private toastrService: CustomToastrService,private router:Router,public authService:AuthService) {
  
 
  }
  ngOnInit(): void {
    this.toastrService.message("..Başlık....","Hoşgeldin",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight});
  }

signOut(){
  localStorage.removeItem("accessToken");
  this.authService.identityCheck();
  this.router.navigate([""]);
  this.toastrService.message("Oturum kapatılmıştır!!","Oturum Kapatıldı",{
    messageType:ToastrMessageType.Warning,
    position:ToastrPosition.BottomLeft
  });

}

  }
