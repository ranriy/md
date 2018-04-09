import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	name;
	qty;
	price;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  	this.display()
  }

  display(){
  	this._route.params.subscribe((params: Params)=>{
  		let observable = this._httpService.getProduct(params['id'])
  		observable.subscribe((res)=>{
  			console.log(res)
  			this.name = res.name;
  			this.qty= res.qty;
  			this.price = res.price;
  		})
  	})
  }

  onDelete(){
    this._route.params.subscribe((params: Params)=>{
      let observable = this._httpService.deleteProduct(params['id'])
      observable.subscribe((res)=>{
        console.log("Deletion Successful")
        this._router.navigate(['/products'])
      })
    })

  }
}
