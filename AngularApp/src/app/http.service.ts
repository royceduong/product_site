import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  serviceGetProducts(){
    return this._http.get('/api/products');
  }
  serviceAddProduct(product){
    return this._http.post('/api/products', product)
  }
  serviceGetProduct(id){
    return this._http.get('/api/products/' + id)
  }
  serviceDelete(id){
    return this._http.delete('/api/products/'+id)
  }
  serviceEditProduct(product){
    return this._http.put('/api/products/'+ product._id, product)
  }
}
