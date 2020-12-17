import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { SubcategoryCreateComponent } from './subcategories/subcategory-create/subcategory-create.component';
import { SubcategoryListComponent } from './subcategories/subcategory-list/subcategory-list.component';

const routes: Routes = [
  {path: 'category', component: CategoryListComponent},
  {path: 'category/add', component: CategoryCreateComponent},
  {path: 'category/edit/:id', component: CategoryCreateComponent},
  {path: 'subcategory', component: SubcategoryListComponent},
  {path: 'subcategory/add', component: SubcategoryCreateComponent},
  {path: 'subcategory/edit/:id', component: SubcategoryCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
