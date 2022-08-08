import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    AppComponent,

    
    
    
   
  ],
  imports: [
    BrowserModule,
  BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    MatMenuModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FileUploadModule
   
  ],
  providers: [  { provide: "baseUrl", useValue: "https://localhost:7218/api", multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
