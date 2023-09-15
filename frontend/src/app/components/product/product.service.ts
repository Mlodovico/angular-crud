import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductInterface } from "./product.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  create(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(this.baseUrl, product);
  }

  read(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.baseUrl);
  }

  readById(id: string | null): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.baseUrl}/${id}`);
  }

  update(product: ProductInterface): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }

  delete(id: number | undefined): Observable<ProductInterface> {
    return this.http.delete<ProductInterface>(`${this.baseUrl}/${id}`);
  }
}
