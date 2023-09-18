import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductInterface } from "./product.model";
import { EMPTY, Observable, catchError, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.handleError(e))
    );
  }

  handleError(err: any): Observable<any> {
    console.log("ERROR: ", err);
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }

  read(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.handleError(e))
    );
  }

  readById(id: string | null): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.handleError(e))
    );
  }

  update(product: ProductInterface): Observable<ProductInterface> {
    return this.http
      .put<ProductInterface>(`${this.baseUrl}/${product.id}`, product)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.handleError(e))
      );
  }

  delete(id: number | undefined): Observable<ProductInterface> {
    return this.http.delete<ProductInterface>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj),
      catchError((e) => this.handleError(e))
    );
  }
}
