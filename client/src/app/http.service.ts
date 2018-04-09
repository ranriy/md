import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
  	let observable = this._http.get('/product')
  	return observable
  }

  getProduct(id){
  	let observable = this._http.get('/product/' + id)
  	return observable
  }

  addProduct(newProduct){
  	console.log("enter service")
  	let observable = this._http.post('/productnew', newProduct)
  	return observable
  }

  updateProduct(productId, newProduct){
  	let observable = this._http.post('/updateproduct/' + productId, newProduct)
  	return observable
  }

  deleteProduct(id){
    console.log("here")
    let observable = this._http.delete('/deleteproduct/' + id)
    return observable
  }
}
