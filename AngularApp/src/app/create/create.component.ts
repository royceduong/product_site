import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct: any;
  errors: any;
  constructor(
    private _httpService: HttpService,
    private _router: Router) {
    this.newProduct = {title:"", price:"", url:""}
    this.errors = [];
   }

  ngOnInit() {
  }
  componentAddProduct(){
    // console.log (this.newProduct);
    if(this.newProduct.title.length < 4){
      this.errors.push("Title must be at least 4 charcters long");
    }
    if(typeof this.newProduct.price != "number"){
      this.errors.push("Price must be a number");
    }
    else{
      var Observable = this._httpService.serviceAddProduct(this.newProduct);
      Observable.subscribe(data => {
        console.log(data);
        this.newProduct = {title:"", price:"", url:""};
        this.goToList();
      })
    }
  }

  goToList() {
    this._router.navigate(['/products']);
  }
}

