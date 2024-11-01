import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any[] = []

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
    this.UserExists()
  }

  UserExists() {
    let email = sessionStorage.getItem('Email');
    let pwd = sessionStorage.getItem('Password');

    if ((email === null || email === undefined || email === "") && (pwd === null || pwd === undefined || pwd === "")) {
      this.router.navigate(['user/login'])
    } else {

    }
  }

  getProducts() {
    this.api.getAllProducts().subscribe((products: any) => {
      console.log(products);
      this.allProducts = products;
    })
  }

}
