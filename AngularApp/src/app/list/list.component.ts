import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: any;
  constructor(private _httpService: HttpService) { 
    this.products = [];
  }

  ngOnInit() {
    this.componentGetProducts();
  }

  componentGetProducts(){
    var Observable = this._httpService.serviceGetProducts();
    Observable.subscribe(data =>{
      console.log(data);
      this.products = data['products'];
      console.log(this.products);
      //create a new property "authors", object with an array of products so i can forloop it on my html.
    })
  }
  componentDelete(id){
    var Observable = this._httpService.serviceDelete(id);
    Observable.subscribe(data =>{
      console.log("do nothing");
      this.componentGetProducts();
    })
  }
}
