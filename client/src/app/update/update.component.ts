import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
	newProduct
	productId
  errors
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { 
  }

  ngOnInit() {
  	this.newProduct = { name: "", qty: "", price:"" }
    this.errors = { name: "", qty: "", price:"" }
  	this.getProduct()
  }

  getProduct(){
  	this._route.params.subscribe((params: Params)=>{
  		this.productId = params['id']
  		let observable = this._httpService.getProduct(params['id'])
  		observable.subscribe((res)=>{
  			console.log(res)
  			this.newProduct.name = res.name;
  			this.newProduct.qty= res.qty;
  			this.newProduct.price = res.price;
  		})
  	})	
  }

  updateProduct(){
  	event.preventDefault()
  	let observable = this._httpService.updateProduct(this.productId, this.newProduct)
  	observable.subscribe((res)=>{
  		console.log(res)
      this._router.navigate(['/products'])
  	},
    err => {
      console.log("hh")
      console.log(err.error);
      this.errors = err.error

  	//this._router.navigate(['/products'])
  })
  }

  Reset(){
    event.preventDefault()
    this.getProduct()
  }

}
