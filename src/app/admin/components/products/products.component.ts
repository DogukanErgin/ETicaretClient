import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent, SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { HttpClientService, RequestParameters } from 'src/app/services/common/http-client.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends CompconfigbaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, ) {
    
    super(spinner);

  }

  ngOnInit(): void {
// this.showSpinner(SpinnerType.BallScaleMultiple);
// setTimeout(() => {
//   this.hideSpinner(SpinnerType.BallScaleMultiple);
// }, 1500);
//     this.httpClientService.get({controller:"products"}).subscribe();
  }

}
