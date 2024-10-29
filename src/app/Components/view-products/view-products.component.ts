import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private toastr : ToastrService) { }
  ngOnInit(): void {
    this.viewProduct()
  }

  product: any = {}

  viewProduct() {
    // to get product id
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res
      console.log(id);

      // get product product details
      this.api.getAProduct(id).subscribe((res: any) => {
        console.log(res);
        this.product = res;
      })

    })
  }

  addToWishlist() {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlist(this.product).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Added to Wislist")
          this.toastr.success('Added to Wishlist')
        },
        error: (err) => {
          alert("Alredy added to wishlist")
          this.toastr.info('Already added to Wishlist')
        }
      })
    } else {
      alert("Please Login !")
    }
  }


  addtoCart(product: any) {
    Object.assign(product, { quantity: 1 })
    console.log(product);
    this.api.addToCart(product).subscribe((res: any) => {
      console.log(res);
      alert(res)

    })

  }

}
