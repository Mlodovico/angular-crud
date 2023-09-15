import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { ProductInterface } from "../product.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: ProductInterface = { name: "", price: null };
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct() {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
