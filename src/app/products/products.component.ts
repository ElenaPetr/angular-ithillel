import { ProductsService } from './../shared/services/products.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {IProduct} from './interfaces/product';
import {Subscription, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public params: Partial<PageEvent> = {
    pageSize: 2,
    pageIndex: 1
  };

  public subscription: Subscription;
  public products$: Observable<IProduct[]>;

  public constructor(
    private productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    // private usersService: UsersService,
  ) {
  }

  public ngOnInit(): void {

    console.log('ngOnInit!!!!!!!');

    this.fetProducts();

    // this.subscription = this.productsService.getProduct()
    // .subscribe((products: IProduct[]) => {
    //   this.products = products;
    //   this.isLoading = false;
    // });
  }

  public addToCart(product: IProduct): void {
    this.productsService.addToCart(product);
  }

  public deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.fetProducts();
    });
  }

  public openProduct(id: number): void {
    this._router.navigate(['/products', id]);
  }

  public addProduct(): void {
  // const newProduct: any = {
  //   "title": "new PRODUCT!!!!!",
  //   "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quae culpa porro ducimus!",
  //   "photo": "http://thejizn.com/wp-content/uploads/2016/06/coca-cola-stash-can-12-oz-1_1.jpg",
  //   "price": 22,
  //   "type": "dessert"
  // },

  //   this.productsService.addProduct(newProduct)
  //   .subscribe((data: IProduct) => {
  //     console.log('success created', data);
  //   });
  }


  // public ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  public changePage(event: PageEvent): void {
    this.params = {...event, pageIndex: event.pageIndex + 1};

    // this._router.navigate([''], { queryParams: this.params,  });
    // skipLocationChange: true - do not change url, but navigate


    this._router.navigate(['/products'], { queryParams: this.params });

    // this.fetProducts(this.params);
  }

  public fetProducts(params?: Partial<PageEvent>): void {
    this.products$ = this._activatedRoute.queryParamMap.pipe(
      switchMap((data: ParamMap) => {
        return params ?
          this.productsService.getProduct(params) :
          this.productsService.getProduct({
            pageIndex: Number(data.get('pageIndex')),
            pageSize: Number(data.get('pageSize')),
          });
      })
    );

    // .subscribe((data) => {
    //   console.log(data);

    // })

    // this._router.navigate(['/products'], { queryParams: this.params });
    // this.products$ = this.productsService.getProduct(this.params);
  }
}
