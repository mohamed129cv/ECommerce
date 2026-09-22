import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../apis/product/product.service';
import { EMPTY, Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';

export const productResolver: ResolveFn<Observable<IProduct>> = (route, state) => {
  let api = inject(ProductService)
  let id = Number(route.paramMap.get('id'))

  return id ? api.getproductById(id) : EMPTY
};
