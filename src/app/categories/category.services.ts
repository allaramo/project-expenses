import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from './category.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryServices {
  private categories : Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();
  private url = 'http://localhost:3000/category';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(){
    this.http.get<{msg: string, categories: any}>(this.url)
    .pipe(map(data=>{
      return data.categories.map(category =>{
        return {
          id: category._id,
          name: category.name
        }
      });
    }))
    .subscribe(categories=>{
      this.categories = categories;
      this.categoriesUpdated.next([...this.categories]);
    });
  }

  getUpdate(){
    return this.categoriesUpdated.asObservable();
  }

  getOne(id: string){
    return this.http.get<{_id: string, name: string}>(this.url + id)
  }

  add(name: string){
      const category : Category = {id: null, name: name};
      this.http.post<{msg: string, id: string}>(this.url, category)
      .subscribe(res=>{
        category.id = res.id;
        this.categories.push(category);
        this.categoriesUpdated.next([...this.categories]);
        this.router.navigate(['/category']);
      });
  }

  update(id: string, name: string){
    const category : Category = {id: id, name: name};
    this.http.put(this.url + id, category)
    .subscribe(res=>{
      const updated = [...this.categories];
      const old = updated.findIndex(cat => cat.id === cat.id);
      updated[old] = category;
      this.categories = updated;
      this.categoriesUpdated.next([...this.categories]);
      this.router.navigate(['/category']);
    });
  }

  delete(id : string){
    this.http.delete(this.url + id)
    .subscribe(()=>{
      const updated = this.categories.filter(cat => cat.id !== cat.id);
      this.categories = updated;
      this.categoriesUpdated.next([...this.categories]);
    });
  }
}
