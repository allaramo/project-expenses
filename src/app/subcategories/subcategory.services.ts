import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subcategory } from './subcategory.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../categories/category.model';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SubcategoryServices {
  private subcategories : Subcategory[] = [];
  private subcategoriesUpdated = new Subject<{data: Subcategory[], count: number}>();
  private url = environment.apiURL+'/subcategory/';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(pageSize: number, page: number){
    const queryParams = "?pageSize="+pageSize+"&page="+page;
    this.http.get<{msg: string, subcategories: any, count: number}>(this.url+queryParams)
    .pipe(map(data=>{
      return {
        results : data.subcategories.map(subcategory =>{
          return {
            id: subcategory._id,
            name: subcategory.name,
            category: subcategory.category
          }
        }),
        count: data.count
      };
    }))
    .subscribe(subcategoriesData=>{
      this.subcategories = subcategoriesData.results;
      this.subcategoriesUpdated.next({data: [...this.subcategories], count: subcategoriesData.count});
    });
  }

  getUpdate(){
    return this.subcategoriesUpdated.asObservable();
  }

  getOne(id: string){
    return this.http.get<{_id: string, name: string, category: Category}>(this.url + id)
  }

  add(name: string, category: Category){
      const subcategory : Subcategory = {id: null, name: name, category: category};
      this.http.post<{msg: string, id: string}>(this.url, subcategory)
      .subscribe(res=>{
        this.router.navigate(['/subcategory']);
      });
  }

  update(id: string, name: string, category: Category){
    const subcategory : Subcategory = {id: id, name: name, category: category};
    this.http.put(this.url + id, subcategory)
    .subscribe(res=>{
      this.router.navigate(['/subcategory']);
    });
  }

  delete(id : string){
    return this.http.delete(this.url + id);
  }
}
