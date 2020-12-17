import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subcategory } from './subcategory.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../categories/category.model';

@Injectable({providedIn: 'root'})
export class SubcategoryServices {
  private subcategories : Subcategory[] = [];
  private subcategoriesUpdated = new Subject<Subcategory[]>();
  private url = 'http://localhost:3000/subcategory/';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(){
    this.http.get<{msg: string, subcategories: any}>(this.url)
    .pipe(map(data=>{
      return data.subcategories.map(subcategory =>{
        return {
          id: subcategory._id,
          name: subcategory.name,
          category: subcategory.category
        }
      });
    }))
    .subscribe(subcategories=>{
      this.subcategories = subcategories;
      this.subcategoriesUpdated.next([...this.subcategories]);
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
        subcategory.id = res.id;
        this.subcategories.push(subcategory);
        this.subcategoriesUpdated.next([...this.subcategories]);
        this.router.navigate(['/subcategory']);
      });
  }

  update(id: string, name: string, category: Category){
    const subcategory : Subcategory = {id: id, name: name, category: category};
    this.http.put(this.url + id, subcategory)
    .subscribe(res=>{
      const updated = [...this.subcategories];
      const old = updated.findIndex(subcat => subcat.id === subcat.id);
      updated[old] = subcategory;
      this.subcategories = updated;
      this.subcategoriesUpdated.next([...this.subcategories]);
      this.router.navigate(['/subcategory']);
    });
  }

  delete(id : string){
    this.http.delete(this.url + id)
    .subscribe(()=>{
      const updated = this.subcategories.filter(subcat => subcat.id !== id);
      this.subcategories = updated;
      this.subcategoriesUpdated.next([...this.subcategories]);
    });
  }
}
