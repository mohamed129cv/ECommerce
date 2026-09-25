import { ProductService } from './../../core/apis/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ProdcutCartComponent } from "../prodcut-cart/prodcut-cart.component";
import { CategoryService } from '../../core/apis/product/category.service';
import { ICategory } from '../../core/interface/icategory';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IProduct } from '../../core/interface/iproduct';
import { IproductFilters } from '../../core/interface/iproduct-filters';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../core/apis/alert.service';

@Component({
  selector: 'app-prodcut',
  standalone: true,
  imports: [ProdcutCartComponent, CommonModule, FormsModule],
  templateUrl: './prodcut.component.html',
  styleUrl: './prodcut.component.css'
})
export class ProdcutComponent {
  constructor(private productService: ProductService, private cate: CategoryService, private router: Router, private activatedRoute: ActivatedRoute, private alert: AlertService) { }
  categoryies: ICategory[] = []
  cateFillter: string = 'all'
  skip: number = 0
  limit: number = 20
  isLodaing: boolean = false
  products: IProduct[] = []
  totalProductPage !: number
  showBar: boolean = false

  ngOnInit(): void {
    this.getCategory()
    this.activatedRoute.queryParams.subscribe(res => {
      this.cateFillter = res['category'] || 'all'
      this.currentpage = Number(res['page'] || 1)
      this.sortBy = res['sort'] || undefined
      this.order = res['order'] || undefined
      if (this.sortBy && this.order) {
        this.selectValue = `${this.sortBy}-${this.order}`;
      } else {
        this.selectValue = '';
      } this.skip = (this.currentpage - 1) * this.limit
      this.lodaProduct()
    })
  }
  //! استدعاء الكتوجري
  getCategory() {
    this.cate.getCategory().subscribe(res => {
      this.categoryies = res
    })
  }
  //! اختيار الكتوجري
  selectCate(category: string) {
    this.router.navigate([], {
      queryParams: { category, page: 1 },

      queryParamsHandling: 'merge'
    })
  }

  //! كل المنتجات

  sortBy: string | undefined = 'price'
  order: string | undefined = 'asc'
  search: string | undefined = ''

  lodaProduct() {

    this.productService.getproductByFilters({
      category: this.cateFillter == 'all' ? undefined : this.cateFillter,
      limit: this.limit,
      skip: this.skip,
      sortBy: this.sortBy,
      order: this.order,
      search: this.search == '' ? undefined : this.search
    }).subscribe({
      next: res => {
        this.isLodaing = true
        setTimeout(() => {

          this.products = res.products
          this.totalProductPage = Math.ceil(res.total / res.limit)
          this.initnumber()
          this.isLodaing = false
        }, 600)
      },
      error: err => {
        console.log(err);
      }
    })
  }
  selectValue = ''
  onSortChange() {
    // let target = (e.target as HTMLSelectElement).value
    if (!this.selectValue) {
      this.sortBy = undefined
      this.order = undefined

    } else {
      let [sort, order] = this.selectValue.split('-')
      this.sortBy = sort
      this.order = order
    }
    this.skip = 0;
    this.router.navigate([], {
      queryParams: {
        order: this.order, sort: this.sortBy, page: 1
      }, queryParamsHandling: 'merge'
    })
    this.lodaProduct()
  }
  onSearch() {
    this.skip = 0
    this.lodaProduct()
  }
  arr: number[] = []
  numbersIsshow: number[] = []
  countPages = 5
  currentpage = 1
  initnumber() {
    this.arr = []
    for (let i = 1; i <= this.totalProductPage; i++) {
      this.arr.push(i)
    }

    let currentIndex = this.arr.indexOf(this.currentpage)
    let half = Math.floor(this.countPages / 2)
    let start = currentIndex - half
    let end = currentIndex + half

    if (start < 0) {
      start = 0
      end = this.countPages
    }
    if (end >= this.totalProductPage) {
      end = this.totalProductPage - 1
      start = Math.max(0, end - this.countPages + 1)
    }

    this.numbersIsshow = this.arr.slice(start, end + 1)

  }
  updataPage(num: number) {
    this.router.navigate([], {
      queryParams: { page: num }, queryParamsHandling: 'merge'
    })
  }
  nextPage() {
    if (this.currentpage < this.totalProductPage) {

      this.router.navigate([], {
        queryParams: { page: this.currentpage + 1 }, queryParamsHandling: 'merge'
      })
    } else {
      this.alert.add_alert('warning', 'You have reached the last page.', '', 3000)
    }
  }
  prevPage() {
    if (this.currentpage > 1) {
      this.router.navigate([], {
        queryParams: { page: this.currentpage - 1 }, queryParamsHandling: 'merge'
      })
    } else {
      this.alert.add_alert('warning', 'You have reached the first page.', '', 3000)
      // alert('s')
    }
  }
}
