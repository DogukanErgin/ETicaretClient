import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { JwtModule } from '@auth0/angular-jwt';

import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

   
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
    FileUploadModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7218"]
      } 
    }),
    SocialLoginModule
   
  ],
  providers: [  { provide: "baseUrl", useValue: "https://localhost:7218/api", multi: true },
  {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("940461952828-9kgapik339ecr6asgcmuphmn65qnriqt.apps.googleusercontent.com")
        }
        
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  },
  {provide: HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
],

  bootstrap: [AppComponent],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
