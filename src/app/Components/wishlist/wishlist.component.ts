import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private api: ApiService, private toastr: ToastrService) { }

  wishlistarray: any = [];

  ngOnInit(): void {
    this.getWishlistProduct()
  }

  getWishlistProduct() {
    this.api.getWishlist().subscribe({
      next: (res: any) => {
        console.log(res);
        this.wishlistarray = res;
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  addToCartfromWishlist(product: any) {
    this.api.addToCartFromWishlist(product).subscribe((res: any) => {
      console.log(res);

      if (res === "Product already exists in the cart") {
        alert(res);
      } else {
        alert(res);
        this.deleteWishlistProduct(product.id);
      }
    })
  }

  deleteWishlistProduct(id: any) {
    this.api.deleteAnItem(id).subscribe((res: any) => {
      alert("Deleted Succesfully...")
      this.toastr.success('Item Deleted Succesfully')
      this.getWishlistProduct()
    })
  }

}
