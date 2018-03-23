import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) {
    this.editProduct = {title:"", price:"", url: ""}
   }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.componentGetProduct(params['id']);
    });
  }

  componentGetProduct(id){
    let Observable = this._httpService.serviceGetProduct(id);
    Observable.subscribe((data:any) =>{
      this.editProduct = data.products;
      console.log(this.editProduct)
    })
  }
  componentEditProduct(){
    console.log(this.editProduct);
    let Observable = this._httpService.serviceEditProduct(this.editProduct);
    Observable.subscribe(data =>{
      console.log(data)
      this._router.navigate(['/products']);
    })
  }
  componentDelete(id){
    console.log("deleting)")
    let Observable = this._httpService.serviceDelete(id);
    Observable.subscribe(data =>{
      console.log("do nothing");
      this._router.navigate(['/products']);
    })
  }
  goList() {
    this._router.navigate(['/products']);
  }

}
