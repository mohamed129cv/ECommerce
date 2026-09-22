import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mainUrlProduct } from '../../url/mainurl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get(`${mainUrlProduct}/categories/`)
  }
}
