import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private rickAndMortyApiUrl = 'https://rickandmortyapi.com/api/character';

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id:string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getRickAndMortyImage() {
    return this.http.get(`${this.rickAndMortyApiUrl}`);
  }
}
