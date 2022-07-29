import { Component, OnInit } from '@angular/core';

import { MessageType, Position } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor( private toastrService: CustomToastrService) {
  
 
  }
  ngOnInit(): void {
    this.toastrService.message("30 dk sürdü","2 kere projeyi siktim aferim bana",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomRight});
  }


  }
