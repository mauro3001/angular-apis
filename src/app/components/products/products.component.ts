import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { parse } from 'date-fns';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:'',
    },
    description: ''
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProductById(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'New Product',
      price: 100,
      images: [this.getRickAndMortyImage()],
      description: 'New Description',
      categoryId: 2
    };
    this.productsService.create(newProduct)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct(id: string) {
    const updateProduct: UpdateProductDTO = {
      title: 'Updated Product',
      price: 300,
      images: [this.getRickAndMortyImage()],
    };
    this.productsService.update(id, updateProduct)
    .subscribe(data => {
      this.productChosen = data;
      const productIndex = this.products.findIndex(p => p.id === id);
      this.products[productIndex] = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    });
  }

  imgUrl: string = '';
  getRickAndMortyImage(): string {
    this.productsService.getRickAndMortyImage().subscribe((data: any) => {
      const random = Math.floor(Math.random() * 20) + 1;
      this.imgUrl = data.results[random].image;
    });
    return this.imgUrl;
  }

}
