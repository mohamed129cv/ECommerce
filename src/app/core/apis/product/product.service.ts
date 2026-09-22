import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mainUrlProduct } from '../../url/mainurl';
import { Observable } from 'rxjs';
import { IproductFilters } from '../../interface/iproduct-filters';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  getAllproject(limit : number , skip : number) : Observable<any>{
    return  this.http.get(`${mainUrlProduct}?limit=${limit}&skip=${skip}`)
  }
  getproductById(id : number): Observable<any>{
    return this.http.get(`${mainUrlProduct}/${id}`)
  }
  getproductBycate( cate:string , limit : number , skip : number): Observable<any>{
    return this.http.get(`${mainUrlProduct}/category/${cate}`)
  }
  getproductByFilters(filters : IproductFilters): Observable<any>{
    let endpoint = `${mainUrlProduct}`
    let prams = new HttpParams()

    if(filters.category){
      endpoint+= `category/${filters.category}`
    }else if(filters.search){
      endpoint+= `search/`
    }
    if(filters.sortBy){
      prams = prams.set('sortBy' , filters.sortBy).set('order', filters.order || 'asc')
    }
    if(filters.search){
      prams = prams.set('q' , filters.search)
    }
    if(filters.limit ){
      prams = prams.set('limit' , filters.limit)
    }
    if(filters.skip ){
      prams = prams.set('skip' , filters.skip)
    }

    return this.http.get(`${endpoint}` , {params : prams})
  }
}
