import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent, SpinnerType } from 'src/app/compconfigbase/compconfigbase.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends CompconfigbaseComponent implements OnInit {

  constructor(private productService:ProductService, spinner: NgxSpinnerService,private alertifyService: AlertifyService) {
    super(spinner);
   }
  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','edit','delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  dataSource : MatTableDataSource<List_Product>=null;
  async getProducts(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);

    const allProducts:{totalCount:number;products: List_Product[]} =await  this.productService.getProduct(this.paginator? this.paginator.pageIndex : 0,this.paginator? this.paginator.pageSize : 5,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.alertifyService.message(errorMessage,{  
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.TopCenter
        }));
        this.dataSource=new MatTableDataSource<List_Product>(allProducts.products);
     
        this.paginator.length=allProducts.totalCount;
  }
  async pageChanged(){
    await this.getProducts();
  }
async  ngOnInit(){

this.getProducts();
    }



 



}
