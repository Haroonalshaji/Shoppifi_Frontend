import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.getCartProduct()
  }

  products: any[] = [];   //to hold the cart products in as a array
  totalPrice: number = 0 // To hold the total price

  constructor(private api: ApiService) { }

  incrementPdtQuantity(products: any[], product: any) {
    this.api.addToCart(products).subscribe((res: any) => {
      // alert(res)
      product.quantity++;
      this.totalPrice = this.sumOfProducts(this.products);
      this.getCartProduct();
    })

  }


  decrementPdtQuantity(products: any,id: any) {
    this.api.decrementItemFromCart(id,products).subscribe({
      next: (res: any) => {
        // alert(res);
        this.getCartProduct();
      },
      error: (err: any) => {
        console.log(err);
        alert('Authorization failed. Please check your token.');
      }
    });
  }

  sumOfProducts(products: any[]): number {
    let totalPrice = 0;
    products.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  getCartProduct() {
    this.api.getCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.map((item: any) => {
          return { ...item, quantity: item.quantity || 1 }; // Initialize quantity if not present
        });
        this.totalPrice = this.sumOfProducts(this.products);
      },
      error: (err => {
        console.log(err);

      })

    })
  }

  deleteCartProducts(id: any) {
    this.api.deleteItemfromCart(id).subscribe((res: any) => {
      alert("Item deleted succesfully");
      this.getCartProduct();
    })
  }


}
