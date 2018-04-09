import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	newProduct
  errors
  constructor(private _httpService: HttpService, 
  	private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  	this.newProduct = { name: "", qty: "", price:"" }
    this.errors = { name: "", qty: "", price:"" }

  }

  addProduct(event){
    event.preventDefault()
    console.log("enter component")
    let observable = this._httpService.addProduct(this.newProduct)
    observable.subscribe(data => {
      console.log(data)
      this.newProduct = { name: "", qty: 0, price:0 }
      this.errors = { name: "", qty: "", price:"" }
      this._router.navigate(['/products']);
    }, err => {
      console.log("hh")
      console.log(err.error);
      this.errors = err.error
    });
    
  }
}
